const express = require("express");
const router = express.Router();
const { loginAdmin, logoutAdmin } = require("../controllers/adminAuthController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

// Đăng nhập admin
router.post("/login", loginAdmin);


// Đăng xuất admin
router.post("/logout", logoutAdmin);

module.exports = router;
