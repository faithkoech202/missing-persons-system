// backend/config/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let connection;

(async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'Snowbit',
      password: process.env.DB_PASSWORD || '5am15.tl',
      database: process.env.DB_NAME || 'tracelink_db'
    });
    console.log('✅ Connected to MySQL database');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
})();

module.exports = {
  query: (...args) => connection.query(...args)
};

