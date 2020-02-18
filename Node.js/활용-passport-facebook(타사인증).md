*생활코딩의 server side js 강의를 참고하여 정리하였습니다*

# passportJS - Facebook으로 Federation authentication(타사 인증) 로그인 구현하기

- Provider: Facebook
- MySQL

**\* [local-passport로 로그인 구현하기](활용-passport-local.md)의 코드에 이어 구현함**
<br/>

## passport-facebook
타사인증을 사용하는 것은 회원가입 절차 필요없는 편리함과 보안 부분에서 유용하게 사용할 수 있다. 타사인증으로 로그인 시 자사 서비스에서는 사용자에 대한 식별자만을 보존한다.<br/>
그 중에서 passportJS를 사용하는 것은 **local인증**과 **타사인증** 을 동시에 유사한 로직으로 구현할 수 있다는 점에서 큰 장점을 가진다.

~~~
$ npm install passport-facebook
~~~

### facebook API 발급

[facebook for developers](https://developers.facebook.com/)에 방문하여 내 앱을 등록하고(facebook 계정이 존재해야 함) 앱 ID와 시크릿 키를 확인한다. 비밀키는 절대 유출하면 안되므로 주의!

### 준비

- html 로그인 form에 아래의 코드와 같이 링크를 추가한다(facebook으로 로그인 처리하는 라우트에 연결해야 함. 뒤에 추가설명 존재)

~~~html
<a href="/auth/facebook">Facebook Login</a>
~~~

### Facebook Strategy

~~~js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//위의 두 모듈은 기존에 추가한 것
const FacebookStrategy = require('passport-facebook').Strategy;
~~~

<br/><br/>
FacebookStrategy를 생성하고 콜백함수가 수행되는데, 콜백함수에 로그인 로직을 작성한다.

~~~js
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,  
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields:['id', 'email', 'name', 'displayName']
    },function (accessToken, refreshToken, profile, done) {
        const authId = 'facebook:'+profile.id;
        const sql = 'SELECT * FROM users WEHRE authId=?';
        conn.query(sql, [authId], function(err, results){

            if(results>0){
                done(null, results[0]);
            }else{
                const newUser = {
                    'authId': authId,
                    'displayName': profile.displayName,
                    'email': profile.emails[0].value
                };
                const sql ='INSERT INTO users SET ?';
                conn.query(sql, newUser, function(err, results){
                    if(err){
                        console.log(err);
                        done('Error');

                    }else{
                        done(null, newUser);
                    }
                });
            }
        });
    }
));
~~~
Facebook인증에 대한 확인 콜백은 accessToken, refreshToken, profile, done 정보를 인자로 받는다. 사용자 프로필 정보를 포함하는 profile 변수를 통해 id, email, name 등의 정보에 접근할 수 있다. 필요로 하는 정보에 따라 profileFields를 수정하면 된다.<br/>

존재하는 사용자일 경우 로그인 성공 처리를 하고, 그렇지 않으면 DB에 새로 추가한다. 새로운 사용자는 'facebook:id'의 형태로 authID값에 저장된다.(자사 서비스 로그인은 local:id 형태로 저장하였음) <br/><br/>

### Login Routes

~~~js
app.get(
    '/auth/facebook',
    passport.authenticate(
        'facebook',
        {scope: 'email'}    //email 정보 필요하여 permission추가
    )
);

app.get(
    '/auth/facebook/callback',
    passport.authenticate(
        'facebook',
    {
        successRedirect: '/welcome',  //성공시
        failureRedirect: '/auth/login'  //실패시
       }
    )
);
~~~
페이스북 인증을 처리하기 위해서는 2개의 라우트작성이 필요하다. <br/>위에 작성한 코드 중 첫번째 라우터(/auth/facebook)는 로그인 처리를 위해 facebook으로 리다이렉션시킨다. <br/>두번째 라우터('/auth/facebook/callback')는 facebook에서 로그인 처리를 한 후 facebook이 다시 이 어플리케이션으로 리다이렉션해준다. 이 라우터의 경로는 위에서 FacebookStrategy객체를 생성할 때 작성한 `callbackURL`변수에 입력한 경로와 일치하도록 해야 한다.
