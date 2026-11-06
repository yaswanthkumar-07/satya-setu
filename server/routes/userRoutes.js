
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

const { verifyToken } = require("../middleware/authMiddleware");

// Citizen registration
router.post("/register", registerUser);

// Citizen login
router.post("/login", loginUser);

// Protected profile route
router.get("/profile", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Authentication successful.",
        user: req.user
    });
});

module.exports = router;
