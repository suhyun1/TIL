module.exports = function(){
    const express = require('express');
    const session = require('express-session'); //기본적으로 session을 메모리에 저장
    const MySQLStore = require('express-mysql-session')(session);   //인자로 session전달
    const bodyParser = require('body-parser');
    const flash = require('connect-flash');

    const app = express();
    app.set('views', './views');
    app.set('view engine', 'pug');
    app.use(flash());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: '3K49A2Q89LZ3$@#^(!dfz',
        resave: false,
        saveUninitialized: true,
        store: new MySQLStore({
            //mysql 접속 정보
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'suhyun',
            database: 'test'
        })
    }));

    return app;
}