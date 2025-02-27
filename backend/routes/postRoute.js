const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');
const { createPost, getAllPosts, getPostByUserId, reactPost, addCommentToPost, sharePost} = require('../controllers/postController');
const router = express.Router();

router.post('/posts', authMiddleware, multerMiddleware.single('media'), createPost);
router.get('/posts', authMiddleware, getAllPosts);
router.get('/posts/user/:id', authMiddleware, getPostByUserId);
router.post('/posts/reacts/:postId', authMiddleware, reactPost);
router.post('/posts/comments/:postId', authMiddleware, addCommentToPost);
router.post('/posts/share/:postId', authMiddleware, sharePost);

module.exports = router;