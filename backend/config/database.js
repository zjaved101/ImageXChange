// const mysql = require('mysql2');

// // Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'*/
})

module.exports = sequelize;