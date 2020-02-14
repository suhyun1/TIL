# passportJS  - 자체 ID와 Password로 로그인 구현하기
passportJS 공식 사이트  www.passportjs.org

## passport-local 모듈 사용
> `passport-local`은 자체적인 사용자의 username과 password를 인증에 사용함
<br/>
### 모듈 준비
~~~
npm install passport passport-local
~~~

~~~js
const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
~~~
`Strategy`는 인증 절차에 사용하는 방식을 의미함. username & password 외에도 OAuth나 federated authentication인 OpenID가 존재함

~~~js
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({ secret: "cats" }));
app.use(passport.initialize()); //Passport 초기화
app.use(passport.session());    //(option)앱의 로그인 방식이 session을 사용할 경우 필요

app.listen(8001, function(){ console.log('connected 8001 port'); });
~~~

`passport.session()`을 사용하기 위해서는 session 정보 먼저 넣어야 함 ([express-session 자료 참고](활용-express-session.md))

- +) 비밀번호 암호화에 `PBKDF2` 사용

~~~js
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();
~~~
> PBKDF2(Password-Based Key Derivation Function)는 솔트를 적용한 후 해시 함수의 반복 횟수를 임의로 선택 가능하다

<br/>

### 준비

- HTML Form: ID와 비밀번호 input의 name값이 각각 `username`과 `password`이어야 함

- DB대신 사용할 users 배열의 모습
~~~js
let users = [
    {
        username: 'suhyun',
        salt: /*PBKDF2를 이용한 salt값*/ ,
        password: /*PBKDF2를 이용한 해시값*/ ,
        displayName: 'Suhyun'
    }
];
~~~
<br/>

### Strategy

~~~js
passport.use(new LocalStrategy(
    function(username, password, done){
        const uname = username;
        const pwd = password;

        for(let i=0; i<users.length;i++){
            const user = users[i];  

            if(uname === user.username){  
                return hasher({password:pwd, salt:user.salt},
                function(err,pass, salt, hash){
                    if(hash === user.password){
                        done(null, user);   //로그인 성공
                    }else{
                        done(null, false); //로그인 실패
                    }
                });
            }
        }
        done(null, false);  //로그인 실패
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
    done(null, user.username);  
});
~~~
username은 고유 정보 인자로, done함수 호출하면 username이 세션에 저장된다. 따라서 serializeUser는 한번 호출됨

- deserializeUser

~~~js
passport.deserializeUser(function (id, done) {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if(user.username == id){
            return done(null, user);
        }
    }
});
~~~
다시방문하여 세션에 username에 이미 저장되어있으면 deserializeUser를 실행한다.
<br/>


### 회원 가입

~~~js
app.post('/auth/register',function(req,res){
    hasher({ password: req.body.password }, function(err, pass, salt, hash){
        const user = {
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName

        };
        users.push(user);

        //login함수는 passport의 기능
        req.login(user, function(err){
            req.session.save(function () {
                res.redirect('/welcome');
            });
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
