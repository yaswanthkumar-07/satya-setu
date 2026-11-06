
const requireAdmin = (req, res, next) => {
    // Check whether the user is logged in as an admin
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin permission required."
        });
    }

    next();
};

module.exports = { requireAdmin };
