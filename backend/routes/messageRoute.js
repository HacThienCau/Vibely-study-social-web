const express = require('express');
const {
    addMessage,
    getMessagesByConversationId,
    markMessageAsRead,
    getUnreadMessageCount,
    getLastMessages
} = require('../controllers/messageController');
const router = express.Router();

// Thêm tin nhắn mới
router.post('/', addMessage);

// Lấy tin nhắn theo conversationId
router.get('/:conversationId', getMessagesByConversationId);

// Đánh dấu tin nhắn đã đọc
router.post('/read', markMessageAsRead);

// Lấy số tin nhắn chưa đọc của user
router.get('/unread/:userId', getUnreadMessageCount);

// Lấy tin nhắn cuối cùng của mỗi cuộc trò chuyện
router.get('/last/:userId', getLastMessages);

module.exports = router;