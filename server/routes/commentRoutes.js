const express = require("express");
const router = express.Router();

const {
    createComment,
    getCommentsByReport,
    deleteComment
} = require("../controllers/commentController");

// Add a comment
router.post("/", createComment);

// Get comments for a report
router.get("/report/:reportId", getCommentsByReport);

// Delete a comment
router.delete("/:id", deleteComment);

module.exports = router;