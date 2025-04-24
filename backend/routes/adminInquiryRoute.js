const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const router = express.Router();
const {
    getInquiries,
    updateInquiry,
    deleteInquiry
} = require("../controllers/adminInquiryController");

router.get("/", adminAuthMiddleware, getInquiries);
router.put("/:id", adminAuthMiddleware, updateInquiry);
router.delete("/:id", adminAuthMiddleware, deleteInquiry);

module.exports = router; 