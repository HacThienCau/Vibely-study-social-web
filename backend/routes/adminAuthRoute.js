const express = require("express");
const router = express.Router();
const { loginAdmin, logoutAdmin } = require("../controllers/adminAuthController");
const { updateAdminPassword } = require("../controllers/adminUpdatePassword");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

// Đăng nhập admin
router.post("/login", loginAdmin);


// Đăng xuất admin
router.post("/logout", logoutAdmin);

// Cập nhật mật khẩu admin
router.put("/update-password", adminAuthMiddleware, updateAdminPassword);

module.exports = router;
