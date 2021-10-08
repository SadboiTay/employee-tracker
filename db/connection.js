const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'c@qQrQ37XHvP',
        database: 'the_company'
    },
    console.log('Connected to the company database.')
)

module.exports = db;