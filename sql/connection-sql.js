const mysql = require('mysql2/promise');
const env = require('dotenv');

env.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
});

module.exports = { connection };