const express = require('express');
const router = express.Router();
const { createConversation, getUserConversations, getConversationBetweenUsers, changeNickname, deleteConversation, getNickname, changeColor } = require('../controllers/conversationController');

router.post('/', createConversation);
router.get('/:userId', getUserConversations);
router.get('/find/:firstUserId/:secondUserId', getConversationBetweenUsers);
router.put('/nickname', changeNickname);
router.delete('/:conversationId', deleteConversation);
router.get('/nickname/:conversationId/:userId', getNickname);
router.put('/color', changeColor);

module.exports = router;
