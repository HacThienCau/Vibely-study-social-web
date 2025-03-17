const express = require('express');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { getAllPosts, getPostByUserId, deletePost, deleteComment, deleteReply, getSinglePost} = require('../controllers/postController');
const router = express.Router();

router.get('/posts', adminAuthMiddleware, getAllPosts);
router.get('/:postId', adminAuthMiddleware, getSinglePost);
router.get('/user/:id', adminAuthMiddleware, getPostByUserId);
router.delete('/deletePost/:postId', adminAuthMiddleware, deletePost);
router.delete('/deleteComment/:postId/:commentId', adminAuthMiddleware, deleteComment);
router.delete('/deleteReply/:postId/:commentId/:replyId', adminAuthMiddleware, deleteReply);

module.exports = router;