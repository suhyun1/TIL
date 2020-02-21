module.exports = function(app){
    const conn = require('./db')();
    const bcrypt = require('bcrypt');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const FacebookStrategy = require('passport-facebook').Strategy;

    app.use(passport.initialize()); 
    app.use(passport.session());   

    passport.serializeUser(function (user, done) {
        done(null, user.authId);  
        
    });

    //다시방문하여 세션에 username이 저장되어있으면 실행 
    passport.deserializeUser(function (id, done) {  //세션의 id값
        console.log('deserializeUser', id);
        const sql = 'SELECT * FROM users WHERE authId=?';
        conn.query(sql, [id], function (err, results) {
            if (err) {
                console.log(err);
                done('There is no user');

            } else {
                done(null, results[0]);
            }
        });

    });

    passport.use(new LocalStrategy( 
        //기본값
        //{usernameField: 'username',
        //passwordField: 'password'},
        function (username, password, done) {
            const uname = username;
            const pwd = password;
            const sql = 'SELECT * FROM users WHERE authId=?';
            conn.query(sql, ['local:' + uname], function (err, results) {
                
                if (err) {
                    console.log(err);     
                }

                const user = results[0];
                if(user){
                    bcrypt.compare(pwd, user.password, function (err, result) {
                        if (result) { 
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Password is not correct.'
                            });
                        }
                    });
                }else{
                    return done(null, false, {
                        message: 'There is no ID.'
                    });
                }
                
            });
            

        }
    ));
    const FACEBOOK_APP_ID = "";
    const FACEBOOK_APP_SECRET = "";
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'displayName']
    },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile.id);
            const authId = 'facebook:' + profile.id;

            //존재하는 사용자인지
            const sql = 'SELECT * FROM users WHERE authId = ?';
            conn.query(sql, [authId], function (err, results) {
                
                if (results.length > 0) {
                    done(null, results[0]);
                } else {
                    const newUser = {
                        authId: authId,
                        displayName: profile.displayName,
                        email : profile.emails[0].value
                    };
                    const sql = 'INSERT INTO users SET ?';
                    conn.query(sql, newUser, function (err, results) {
                        if (err) {
                            console.log(err);
                            done('Error');

                        } else {
                            done(null, newUser);
                        }
                    });
                }
            });

        }
    ));

    return passport;
}