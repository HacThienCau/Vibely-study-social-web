const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const {
  getAllUsers,
  deleteUser,
  searchUsers,
} = require("../controllers/adminUserController");
const router = express.Router();
// Lấy danh sách tất cả users
router.get("/", adminAuthMiddleware, getAllUsers);

// Xóa user theo ID
router.delete("/:userId", adminAuthMiddleware, deleteUser);

// Tìm kiếm users
router.get("/search", adminAuthMiddleware, searchUsers);

module.exports = router;
