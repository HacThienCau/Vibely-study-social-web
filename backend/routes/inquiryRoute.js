const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { createInquiry } = require("../controllers/inquiryController");

// Route tạo yêu cầu từ người dùng
router.post("/", authMiddleware, createInquiry);

// Route lấy tất cả các yêu cầu từ người dùng
router.get("/", authMiddleware, getUserInquiries);

// Route lấy yêu cầu từ người dùng theo ID
router.get("/:id", authMiddleware, getInquiry);


module.exports = router;