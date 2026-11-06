
const { pool } = require("../config/db");

// Create a new corruption report
const createReport = async (req, res) => {
    try {
        const { title, description, category, location } = req.body;

        if (!title || !description || !category || !location) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, description, category and location."
            });
        }

        const sql = `
            INSERT INTO reports (title, description, category, location)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            title,
            description,
            category,
            location
        ]);

        res.status(201).json({
            success: true,
            message: "Report submitted successfully.",
            reportId: result.insertId
        });
    } catch (error) {
        console.error("Create report error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to submit report."
        });
    }
};

// Get all reports
const getAllReports = async (req, res) => {
    try {
        const [reports] = await pool.execute(
            "SELECT * FROM reports ORDER BY created_at DESC"
        );

        res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });
    } catch (error) {
        console.error("Get reports error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to retrieve reports."
        });
    }
};

// Get one report by ID
const getReportById = async (req, res) => {
    try {
        const [reports] = await pool.execute(
            "SELECT * FROM reports WHERE id = ?",
            [req.params.id]
        );

        if (reports.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Report not found."
            });
        }

        res.status(200).json({
            success: true,
            report: reports[0]
        });
    } catch (error) {
        console.error("Get report error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to retrieve report."
        });
    }
};

// Update a report
const updateReport = async (req, res) => {
    try {
        const { title, description, category, location, status } = req.body;

        const [result] = await pool.execute(
            `UPDATE reports
             SET title = ?, description = ?, category = ?,
                 location = ?, status = ?
             WHERE id = ?`,
            [
                title,
                description,
                category,
                location,
                status,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Report not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Report updated successfully."
        });
    } catch (error) {
        console.error("Update report error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to update report."
        });
    }
};

// Delete a report
const deleteReport = async (req, res) => {
    try {
        const [result] = await pool.execute(
            "DELETE FROM reports WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Report not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Report deleted successfully."
        });
    } catch (error) {
        console.error("Delete report error:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete report."
        });
    }
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
};
