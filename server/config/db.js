
const mysql = require("mysql2/promise");
const path = require("path");
const dotenv = require("dotenv");

// Load the exact .env file
dotenv.config({
    path: path.join(__dirname, "../.env")
});

console.log("Database user:", process.env.DB_USER);
console.log("Database name:", process.env.DB_NAME);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

async function testConnection() {
    const connection = await pool.getConnection();

    console.log("MySQL Database Connected Successfully!");

    connection.release();
}

module.exports = {
    pool,
    testConnection
};
