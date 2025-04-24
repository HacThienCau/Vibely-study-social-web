const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getQuizzes,
    getQuizById
} = require("../controllers/quizController");

const router = express.Router();

router.get("/", authMiddleware, getQuizzes);
router.get("/:id", authMiddleware, getQuizById);

module.exports = router;
