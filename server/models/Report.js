
const { pool } = require("../config/db");

const Report = {
    // Create a report
    async create(reportData) {
        const { title, description, category, location } = reportData;

        const [result] = await pool.execute(
            `INSERT INTO reports (title, description, category, location)
             VALUES (?, ?, ?, ?)`,
            [title, description, category, location]
        );

        return result.insertId;
    },

    // Get all reports
    async getAll() {
        const [rows] = await pool.execute(
            "SELECT * FROM reports ORDER BY created_at DESC"
        );

        return rows;
    },

    // Get report by ID
    async getById(id) {
        const [rows] = await pool.execute(
            "SELECT * FROM reports WHERE id = ?",
            [id]
        );

        return rows[0];
    }
};

module.exports = Report;
