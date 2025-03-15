const express = require('express');
const router = express.Router();
const { loginAdmin, logoutAdmin } = require('../controllers/adminAuthController');
const authMiddleware = require('../middleware/authMiddleware');

/// Đăng nhập admin
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginAdmin({ email, password });

        // Gửi token qua cookie
        res.cookie("auth_token", result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Đăng nhập thành công", admin: result.admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Đăng xuất admin
router.post("/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.status(200).json(logoutAdmin());
});

// Một route yêu cầu xác thực admin
router.get("/dashboard", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Chào mừng Admin!", admin: req.user });
});

module.exports = router;
