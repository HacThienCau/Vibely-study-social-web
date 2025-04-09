const express = require('express');
const router = express.Router();
const { createConversation, getUserConversations, getConversationBetweenUsers, changeNickname, deleteConversation, getNickname } = require('../controllers/conversationController');

router.post('/', createConversation);
router.get('/:userId', getUserConversations);
router.get('/find/:firstUserId/:secondUserId', getConversationBetweenUsers);
router.put('/nickname', changeNickname);
router.delete('/:conversationId', deleteConversation);
router.get('/nickname/:conversationId/:userId', getNickname);

module.exports = router;
