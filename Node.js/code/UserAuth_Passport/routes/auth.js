
module.exports  = function(passport){    
    const bcrypt = require('bcrypt');
    const conn = require('../lib/db')();
    const route = require('express').Router();
    route.post(
        '/login',
        passport.authenticate(  
            'local',    //local strategy 사용
            {
                successRedirect: '/',
                failureRedirect: '/auth/login',
                failureFlash: true ,
                successFlash: true
            }
        )
    );
    route.get(
        '/facebook',
        passport.authenticate(
            'facebook',
            { scope: 'email' }    //permission
        )
    );

    route.get(
        '/facebook/callback',
        passport.authenticate(
            'facebook',
            {
                successRedirect: '/',
                failureRedirect: '/auth/login',
                failureFlash: true,
                successFlash: true
            }
        )
    );

    route.post('/register', function (req, res) {
        const post = req.body;
        const username = post.username;
        const authId = 'local:' + username;
        const pwd = post.password;
        const pwd2 = post.password2;
        const displayName = post.displayName;
       
        const sql = 'SELECT * FROM users WHERE authId = ?';
        conn.query(sql, [authId], function (err, results) {

            if (results.length > 0) {
                req.flash('error', 'The same username exists.');
                res.redirect('/auth/register');
            } else if (pwd !== pwd2){
                req.flash('error', 'Password must be the same.');
                res.redirect('/auth/register'); 
            }else {
                bcrypt.hash(pwd, 10, function(err, hash){

                    const user = {
                        authId: authId,
                        username: username,
                        password: hash,
                        displayName: displayName
                    };

                    const sql = 'INSERT INTO users SET ?';
                    conn.query(sql, user, function (err, results) {
                        if (err) {
                            console.log(err);
                            res.status(500);
                        } else {
                            req.login(user, function (err) {
                                req.session.save(function () {
                                    res.redirect('/');
                                });
                            });
                        }
                    });
                });
                
            }
        });
        
    });
    route.get('/register', function (req, res) {
       
        res.render('auth/register', {feedback:req.flash('error')});
        
    });
    route.get('/login', function (req, res) {
        const fmsg = req.flash();
        let feedback = '';
        if(fmsg){
            feedback = fmsg.error;
        }
        res.render('auth/login', { feedback:feedback});
    });


    route.get('/logout', function (req, res) {
        req.logout(); //passport 기능 (세션 삭제됨)
        req.session.save(function () {    //작업 끝난후 redirect
            res.redirect('/');
        });

    });

    return route;
}