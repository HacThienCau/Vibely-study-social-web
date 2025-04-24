const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
    getFilteredDocuments,
    getDocumentById,
    getLevels,
    getSubjectsByLevel,
    saveDocument
} = require("../controllers/documentController");

router.get("/levels", getLevels);
router.get("/subjects/:levelId", getSubjectsByLevel);

router.post("/save", authMiddleware, saveDocument);

router.get("/", authMiddleware, getFilteredDocuments);

router.get("/:id", authMiddleware, getDocumentById);

module.exports = router;
