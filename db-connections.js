var mysql = require('mysql2');
var connection = mysql.createConnection({
    host:'localhost',
    port: '3306',
    user: 'root',
    password: 'Bryanteo2005',
    database: 'myDB'
});
connection.connect(err => {
    if(err) throw err;
    console.log('Connected to DB');
});

module.exports = connection;