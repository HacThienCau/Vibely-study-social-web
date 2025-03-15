const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');
const { createPost, getAllPosts, getPostByUserId, reactPost, addCommentToPost, sharePost, createStory, getAllStories, reactStory, addReplyToPost, deletePost, deleteComment, deleteReply, getSinglePost} = require('../controllers/postController');
const router = express.Router();

router.post('/posts', authMiddleware, multerMiddleware.single('media'), createPost);
router.get('/posts', authMiddleware, getAllPosts);
router.get('/posts/:postId', authMiddleware, getSinglePost);
router.get('/posts/user/:id', authMiddleware, getPostByUserId);
router.post('/posts/reacts/:postId', authMiddleware, reactPost);
router.post('/posts/comments/:postId', authMiddleware, addCommentToPost);
router.post('/posts/share/:postId', authMiddleware, sharePost);
router.post('/story', authMiddleware, multerMiddleware.single('media'), createStory);
router.get('/story', authMiddleware, getAllStories);
router.post('/story/reacts/:storyId', authMiddleware, reactStory);
router.post('/posts/reply/:postId', authMiddleware, addReplyToPost);
router.delete('/posts/deletePost/:postId', authMiddleware, deletePost);
router.delete('/posts/deleteComment/:postId/:commentId', authMiddleware, deleteComment);
router.delete('/posts/deleteReply/:postId/:commentId/:replyId', authMiddleware, deleteReply);

module.exports = router;