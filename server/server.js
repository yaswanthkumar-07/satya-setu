const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Import API routes
const reportRoutes = require("./routes/reportRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

// Connect API routes
app.use("/api/reports", reportRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Satya Setu Backend!");
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Satya Setu server is running"
    });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`Satya Setu server running on port ${PORT}`);
    });
}

startServer();
