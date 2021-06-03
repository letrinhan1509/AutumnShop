const { json } = require('body-parser');
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fashion_shop'
})

db.connect(function (err) {  
    if (err) 
        console.log('Database is connected fail! Please check the connection again!');
    else
        console.log('Database is connected successfully!');
});

module.exports = db;