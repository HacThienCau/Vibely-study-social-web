const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
    createInquiry,
    getInquiries,
    updateInquiry
} = require("../controllers/inquiryController");

router.post("/", authMiddleware, createInquiry);
router.get("/", authMiddleware, getInquiries);
router.put("/:id", authMiddleware, updateInquiry);

module.exports = router;