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

// Route lấy danh sách tài liệu theo level
router.get("/levels", getLevels);

// Route lấy danh sách môn học theo levelId
router.get("/subjects/:levelId", getSubjectsByLevel);

// Route tạo mới level và subject
router.post("/levels", authMiddleware, createLevel);
router.post("/subjects", authMiddleware, createSubject);

// Route lưu tài liệu
router.post("/save", authMiddleware, saveDocument);

// Route lấy danh sách tài liệu, tạo mới tài liệu, cập nhật tài liệu, xóa tài liệu
router.route("/")
    .get(authMiddleware, getFilteredDocuments)
    .post(authMiddleware, createDocument);

// Route lấy tài liệu theo ID, cập nhật tài liệu, xóa tài liệu
router.route("/:id")
    .get(authMiddleware, getDocumentById)
    .put(authMiddleware, updateDocument)
    .delete(authMiddleware, deleteDocument);

module.exports = router;
