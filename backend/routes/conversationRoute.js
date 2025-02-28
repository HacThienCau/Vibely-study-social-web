const express = require('express');
const router = express.Router();
const { createConversation, getUserConversations, getConversationBetweenUsers } = require('../controllers/conversationController');

router.post('/', createConversation);
router.get('/:userId', getUserConversations);
router.get('/find/:firstUserId/:secondUserId', getConversationBetweenUsers);

module.exports = router;
