const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createChat, getChats, getChatItem, putQuestion } = require('../controllers/chatbotController');

router.post('/', authMiddleware, createChat);
router.get('/', authMiddleware, getChats);
router.get('/:chatId', authMiddleware, getChatItem);
router.put('/:chatId', authMiddleware, putQuestion);

module.exports = router;