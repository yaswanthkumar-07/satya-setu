
const express = require("express");
const router = express.Router();

const {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport
} = require("../controllers/reportController");

const { verifyToken } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/adminMiddleware");

// Citizen and public report routes
router.post("/", verifyToken, createReport);
router.get("/", getAllReports);
router.get("/:id", getReportById);

// Admin-only report management
router.put("/:id", verifyToken, requireAdmin, updateReport);
router.delete("/:id", verifyToken, requireAdmin, deleteReport);

module.exports = router;
