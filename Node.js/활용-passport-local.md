*생활코딩의 server side js 강의를 참고하여 정리하였습니다*

# passportJS  - 자체 ID와 Password로 로그인 구현하기 (Mysql버전)
passportJS 공식 사이트  www.passportjs.org <br/>



## passport-local 모듈 사용
`passport-local`은 자체적인 사용자의 username과 password를 인증에 사용함
<br/>

### 구현 준비

- HTML Form: ID와 비밀번호 input의 name값이 각각 `username`과 `password`이어야 함

- DB table

Field |  Type
-|-
id | int(11) AI PK
authId |  varchar(50)
username | varchar(30)
password | varchar(255)
salt | varchar(255)
displayName | varchar(50)
email | varchar(50)

\* authId는 local에서 등록한 아이디와 타사인증을 통해 얻은 아이디를 구분하기 위해 'local:id'와 같은 형태로 입력되도록 한다. ex) local:suhyun
<br/>

### 모듈 준비

~~~
npm install passport passport-local
~~~
passport와 passport-local 모두 필요
<br/>

~~~js
const express = require('express');
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : /*사용자 password*/,
    database : /*DB명*/
})
~~~

`Strategy`는 인증 절차에 사용하는 방식을 의미함. username & password 외에도 OAuth나 federated authentication인 OpenID가 존재함
<br/>


- +) 비밀번호 암호화에 `PBKDF2` 사용

~~~js
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();
~~~
> PBKDF2(Password-Based Key Derivation Function)는 솔트를 적용한 후 해시 함수의 반복 횟수를 임의로 선택 가능하다

<br/>

~~~js
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        //mysql 접속 정보
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: /*사용자 password*/,
        database: /*DB명*/
    })
}));
app.use(passport.initialize()); //Passport 초기화
app.use(passport.session());    //(option)앱의 로그인 방식이 session을 사용할 경우 필요

app.listen(8001, function(){ console.log('connected 8001 port'); });
~~~

`passport.session()`을 사용하기 위해서는 session 정보 먼저 넣어야 함 ([express-session 자료 참고](활용-express-session.md))

<br/>

### Strategy

~~~js
passport.use(new LocalStrategy(
  function(username, password, done){
      const uname = username;
      const pwd = password;
      const sql = 'SELECT * FROM users WHERE authId=?';
      conn.query(sql, ['local:'+uname], function(err, results){
          if(err){
              return done('There is no user.');
          }
          const user = results[0];
          return hasher({ password: pwd, salt: user.salt },function(err,pass, salt, hash){
              if(hash === user.password){
                 done(null, user);   //로그인 성공
              }else{
                  done(null, false); //로그인 실패함
              }
          });
      });
  }
));
~~~
<br/>

- Verify Callback

Strategy는 verify 콜백인 `done`함수가 필요하다. passport는 request에 담긴 id, pw 같은 로그인 정보를 인자로 콜백을 호출한다.<br/>
로그인 정보가 유효하면 아래와 같이 호출한다.
~~~
return done(null, user);
~~~
로그인 정보가 유효하지 않을 경우 user대신 false를 통해 호출한다.
~~~
return done(null, false);
~~~

### Route

~~~js
// /auth/login : 로그인 페이지
app.post(
    '/auth/login',
    passport.authenticate(
        'local',    //local strategy 사용함
        {
            successRedirect:'/welcome', //로그인 성공시
            failureRedirect: '/auth/login', //로그인 실패시
            failureFlash: false //인증실패 메시지 보여주는지에 대한 변수
        }
    )
);
~~~

Local Strategy를 사용한다고 함으로써 passport에 등록된 LocalStrategy객체의 인자인 콜백함수 실행하게 된다.
<br/>
### Sessions - serialize
- serializeUser

~~~js
passport.serializeUser(function (user, done) {  
    done(null, user.authId);  
});
~~~
authId는 고유 정보 인자로, done함수 호출하면 authId값이 세션에 저장된다. 따라서 serializeUser는 한번만 호출됨

- deserializeUser

~~~js
passport.deserializeUser(function (id, done) {
    const sql = 'SELECT * FROM users WHERE authId=?';
    conn.query(sql, [id], function(err, results){
        if(err){
            console.log(err);
            done('There is no user.');

        }else{
            done(null, results[0]);
        }
    });
});
~~~
다시 방문하여 세션에 id값이 이미 저장되어있으면 deserializeUser를 실행한다.
<br/>


### 회원 가입

~~~js
app.post('/auth/register',function(req,res){
    hasher({ password: req.body.password }, function(err, pass, salt, hash){
        const user = {
            authId: 'local:' + req.body.username,
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName

        };

        const sql = 'INSERT INTO users SET ?';
        conn.query(sql, user, function (err, results){
            if(err){
                console.log(err);
                res.status(500);
            }else{
                //login함수는 passport의 기능
                req.login(user, function (err) {
                    req.session.save(function () {
                        res.redirect('/welcome');
                    });
                });
            }
        });
    });
});
~~~


### 메인화면(로그인 성공 시)
~~~js
app.get('/welcome', function (req,res) {
    //passport는 user객체를 req객체 소속으로 만든다.
    //이 user정보는 deserializeUser가 리턴하는 done함수의 두번째 인자 user에서 온 것
    if (req.user && req.user.displayName) { //로그인 성공 시
        res.send(`
        <h1>hello ${req.user.displayName}</h1>
        <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
            <h1>Welcome</h1>
            <ul>
                <li><a href="/auth/login">Login</a></li>
                <li><a href="/auth/register">Register</a></li>
            </ul>
        `);
    }

});
~~~

### 로그아웃
~~~js
app.get('/auth/logout', function(req,res){
    req.logout(); //세션 삭제됨 (passport의 기능)
    req.session.save(function(){  
        res.redirect('/welcome');
    });
});
~~~
