# express - session
### Session이란?
> 클라이언트 요청 시 사용자를 식별할 수 있는 id가 담긴 쿠키.<br/>
세션은 사용자의 식별자만 저장했다가 응답시에 식별자를 이용해 서버 안의 데이터를 가져온다. request header에서 set-cookie를 살펴보자. connect.sid라는 식별자가 같다면 같은 사용자라고 판별한다.<br/>
클라이언트의 머신에는 중요한 사용자 정복가 아닌 식별자만 저장하므로 더욱 안전하다.
따라서 일반적으로 로그인 방식에 세션을 사용한다.


### Cookie와 Session 차이

/| Cookie | Session
-|-|-
저장위치 |클라이언트|서버
저장형식 |text|object
라이프사이클 | 브라우저 종료해도 정보가 남아 있음(만료시간 존재) | 만료시간 존재하지만 브라우저 종료시 만료시간과 상관없이 삭제됨
속도 | 비교적 빠름 | 데이터가 서버에 있어 처리속도로 인해 비교적 느림
보안 | 로컬에 저장되므로 탈취할 가능성 높아 위험 | 비교적 보안성 좋음

<br/><br/><br/>
### express에서 session 사용하기
- 사용 방법
~~~
npm install express-session
~~~
express에 세션기능 추가하는 패키지 `express-session`


~~~js
const session = require('express-session');
app.use(session({
    secret: '3K49A2Q89LZ3$@#^(!dfz',
    resave: false,
    saveUninitialized: true
}));
~~~

간단한 counter 예제
~~~js
app.get('/count', function(req,res){
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
    res.send('count: ' + req.session.count);
});
~~~
session id가 동일한 경우, 요청 시 count 값이 1씩 증가한다.<br/>

\* req.session : 요청 객체의 객체 프로퍼티<br/>

\* req.sessionID는 client를 구분할 수 있는 session-id


<br/><br/>
### Login 기능 구현
**\* 이 예제는 session 연습을 위한 간단한 예제로, 안전한 구현 방법이 아님**
~~~js
//DB대신
let users = [
    {
        username: 'suhyun',
        password: '111111',
        displayName: 'Suhyun'
    }
];
app.get('/auth/logout', function(req,res){
    delete req.session.displayName; //서버상에서 제거됨
    res.redirect('/welcome');
});
app.get('/welcome', function (req,res) {
    if (req.session.displayName) {//로그인성공
        res.send(`
        <h1>hello ${req.session.displayName}</h1>
        <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`<a href="/auth/login">Login</a>`);
    }

});

app.post('/auth/login', function (req, res) { //post처리위해 body-parser모듈 필요

    const uname = req.body.username;
    const pwd = req.body.password;

    if (uname == user.username && pwd == user.password) {
        req.session.displayName = user.displayName;
        res.redirect('/welcome');
    } else {
        res.send('who are you?');
    }
});

app.get('/auth/login', function(req,res){
    let output = `
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name ="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;
    res.send(output);
});
~~~

### file에 session 저장
~~~js
const session = require('express-session'); //이 모듈은 기본적으로 메모리에 저장함
const FileStore = require('session-file-store')(session);   //인자로 session전달
~~~

~~~js
app.use(session({
    secret: '3K49A2Q89LZ3$@#^(!dfz',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
~~~
이렇게 수정하면 'sessions'라는 폴더에 저장된다.


### DB(mysql)에 session 저장
~~~js
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);   //인자로 session전달
~~~

~~~js
app.use(session({
    secret: '3K49A2Q89LZ3$@#^(!dfz',
    resave: false,
    saveUninitialized: true,

    ////mysql 접속 정보에 대한 옵션 필수
    store: new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'suhyun',
        database: 'test'
    })
}));
~~~

수행 결과 sessions라는 table이 생성된다. table을 확인해보면 session_id, expires, data 정보를 가진다.

~~~js
app.get('/auth/logout', function(req,res){
    delete req.session.displayName;
    res.redirect('/welcome');
});
~~~
위의 코드는 logout 시 수행하는 내용인데, DB에 저장이 끝난후에 redirect하도록 아래 코드처럼 콜백함수 안에 넣어주는 것이 좋다.
~~~js
app.get('/auth/logout', function(req,res){
    delete req.session.displayName;

    //db에 저장이 끝난 후에 redirect
    req.session.save(function(){
        res.redirect('/welcome');
    })

});
~~~
