module.exports = function(){
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: ''
    })

    conn.connect();
    return conn;
}