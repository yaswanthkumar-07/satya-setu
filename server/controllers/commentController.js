
const { pool } = require("../config/db");

// Add a new comment
const createComment = async (req, res) => {
    try {
        const { report_id, user_name, comment } = req.body;

        if (!report_id || !user_name || !comment) {
            return res.status(400).json({
                success: false,
                message: "Please provide report ID, user name and comment."
            });
        }

        const sql = `
            INSERT INTO comments (report_id, user_name, comment)
            VALUES (?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            report_id,
            user_name,
            comment
        ]);

        res.status(201).json({
            success: true,
            message: "Comment added successfully.",
            commentId: result.insertId
        });
    } catch (error) {
        console.error("Create comment error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to add comment."
        });
    }
};

// Get all comments for a report
const getCommentsByReport = async (req, res) => {
    try {
        const [comments] = await pool.execute(
            `SELECT * FROM comments
             WHERE report_id = ?
             ORDER BY created_at DESC`,
            [req.params.reportId]
        );

        res.status(200).json({
            success: true,
            count: comments.length,
            comments
        });
    } catch (error) {
        console.error("Get comments error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to retrieve comments."
        });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const [result] = await pool.execute(
            "DELETE FROM comments WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Comment not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully."
        });
    } catch (error) {
        console.error("Delete comment error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete comment."
        });
    }
};

module.exports = {
    createComment,
    getCommentsByReport,
    deleteComment
};
