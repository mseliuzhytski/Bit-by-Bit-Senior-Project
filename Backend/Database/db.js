const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b49a1b4f62d440',
    password: '105c9183',
    database: 'heroku_b86450961ab53ab'
});

module.exports = db;