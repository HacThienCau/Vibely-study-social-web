const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
    getFilteredDocuments,
    createDocument,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getLevels,
    getSubjectsByLevel,
    createLevel,
    createSubject,
    saveDocument
} = require("../controllers/documentController");

router.get("/levels", getLevels);
router.get("/subjects/:levelId", getSubjectsByLevel);

router.post("/levels", authMiddleware, createLevel);
router.post("/subjects", authMiddleware, createSubject);

router.post("/save", authMiddleware, saveDocument);

router.route("/")
    .get(authMiddleware, getFilteredDocuments)
    .post(authMiddleware, createDocument);

router.route("/:id")
    .get(authMiddleware, getDocumentById)
    .put(authMiddleware, updateDocument)
    .delete(authMiddleware, deleteDocument);

module.exports = router;
