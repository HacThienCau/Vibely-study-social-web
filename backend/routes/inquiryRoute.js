const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
    createInquiry,
    getInquiries,
    updateInquiry,
    deleteInquiry
} = require("../controllers/inquiryController");

router.post("/", authMiddleware, createInquiry);
router.get("/", authMiddleware, getInquiries);
router.put("/:id", authMiddleware, updateInquiry);
router.delete("/:id", authMiddleware, deleteInquiry);

module.exports = router;