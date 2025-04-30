const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const {
  getAllUsers,
  deleteUser,
  searchUsers,
} = require("../controllers/adminUserController");
const router = express.Router();

// Route lấy danh sách tất cả users
router.get("/", adminAuthMiddleware, getAllUsers);

// Route xóa user theo ID
router.delete("/:userId", adminAuthMiddleware, deleteUser);

// Route tìm kiếm users
router.get("/search", adminAuthMiddleware, searchUsers);

module.exports = router;
