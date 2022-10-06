
// const mysql = require('mysql2');
import mysql from "mysql2"

export const getDbConnection = () => {

    // create the connection to database
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'auto_sales'
    });
    
    return conn
}

