const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'c@qQrQ37XHvP',
        database: 'the_company'
    },
    console.log('\nEmployee Tracker Initialized.\nConnected to the company database.\n')
)

module.exports = db;