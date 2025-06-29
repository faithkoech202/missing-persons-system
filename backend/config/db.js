// backend/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Snowbit',
  password: process.env.DB_PASSWORD || '5am15.tl',
  database: process.env.DB_NAME || 'tracelink_db'
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;
