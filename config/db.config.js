const mysql = require('mysql');

const conn = mysql.createConnection({
    connectionLimit: 5,
    host: '172.21.0.2',
    user: 'root',
    password: 'secret',
    database: 'todos',
    multipleStatements: true
});

conn.connect(function(err) {
    if (err) {
        return console.error('error: ' +err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = conn;