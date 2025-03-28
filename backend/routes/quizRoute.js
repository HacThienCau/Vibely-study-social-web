const express = require("express");
const {
    createQuiz,
    getQuizzes,
    updateQuiz,
    deleteQuiz,
    getQuizById
} = require("../controllers/quizController");

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.get("/:id", getQuizById);

module.exports = router;
