const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const {
  getAllUsers,
  deleteUser,
  searchUsers,
} = require("../controllers/adminUserController");
const router = express.Router();
// xóa tạm adminAuthMiddleware vì chưa có đăng nhập => token hết hạn => lỗi
// Lấy danh sách tất cả users
router.get("/", getAllUsers);

// Xóa user theo ID
router.delete("/:userId", deleteUser);

// Tìm kiếm users
router.get("/search", searchUsers);

module.exports = router;
