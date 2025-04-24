const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
    createInquiry,
    getUserInquiries,
    getInquiry
} = require("../controllers/inquiryController");

router.post("/", authMiddleware, createInquiry);
router.get("/", authMiddleware, getUserInquiries);
router.get("/:id", authMiddleware, getInquiry);

module.exports = router;