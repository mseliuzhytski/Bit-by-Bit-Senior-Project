const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bab5e4a2834513',
    password: '1b5f71bd',
    database: 'heroku_9b0d7a28a628498'
});

module.exports = db;