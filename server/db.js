const mysql = require("mysql2/promise");

// ✅ Adjust these values to match YOUR MySQL setup
const pool = mysql.createPool({
  host: "localhost",
  user: "root",         // change if your MySQL uses another username
  password: "Trafficpolice$2341",         // if you have a password for MySQL, put it here (e.g., "root123")
  database: "meditrack", // must match your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
