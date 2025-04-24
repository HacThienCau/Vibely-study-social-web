const express = require("express");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const {
    createQuiz,
    getQuizzes,
    updateQuiz,
    deleteQuiz,
    getQuizById
} = require("../controllers/adminQuizController");

const router = express.Router();

router.post("/", adminAuthMiddleware, createQuiz);
router.get("/", adminAuthMiddleware, getQuizzes);
router.put("/:id", adminAuthMiddleware, updateQuiz);
router.delete("/:id", adminAuthMiddleware, deleteQuiz);
router.get("/:id", adminAuthMiddleware, getQuizById);

module.exports = router; 