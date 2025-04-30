const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createChat, getChats, getChatItem, putQuestion, streamChatbotResponse } = require('../controllers/chatbotController');

// Route tạo chat mới
router.post('/', authMiddleware, createChat);

// Route lấy danh sách các chat
router.get('/', authMiddleware, getChats);

// Route lấy thông tin chi tiết của một chat
router.get('/:chatId', authMiddleware, getChatItem);

// Route lấy câu trả lời từ chatbot
router.put('/:chatId', authMiddleware, putQuestion);

module.exports = router;