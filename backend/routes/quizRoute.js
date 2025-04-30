const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getQuizzes,
    getQuizById
} = require("../controllers/quizController");

const router = express.Router();

// Route lấy tất cả các quiz
router.get("/", authMiddleware, getQuizzes);

// Route lấy quiz theo ID
router.get("/:id", authMiddleware, getQuizById);

module.exports = router;
