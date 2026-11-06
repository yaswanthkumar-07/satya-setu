
const { pool } = require("../config/db");

const Comment = {
    // Create a comment
    async create(commentData) {
        const { report_id, user_name, comment } = commentData;

        const [result] = await pool.execute(
            `INSERT INTO comments (report_id, user_name, comment)
             VALUES (?, ?, ?)`,
            [report_id, user_name, comment]
        );

        return result.insertId;
    },

    // Get comments by report ID
    async getByReportId(reportId) {
        const [rows] = await pool.execute(
            `SELECT * FROM comments
             WHERE report_id = ?
             ORDER BY created_at DESC`,
            [reportId]
        );

        return rows;
    },

    // Delete a comment
    async delete(id) {
        const [result] = await pool.execute(
            "DELETE FROM comments WHERE id = ?",
            [id]
        );

        return result.affectedRows;
    }
};

module.exports = Comment;
