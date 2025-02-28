const express = require('express');
const { addMessage, getMessagesByConversationId } = require('../controllers/messageController');
const router = express.Router();
router.post('/', addMessage);
router.get('/:conversationId', getMessagesByConversationId);

module.exports = router;