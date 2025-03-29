const express = require('express');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { getAllPosts, getPostByUserId, deletePost, deleteComment, deleteReply, getSinglePost} = require('../controllers/postController');
const router = express.Router();
// xóa tạm adminAuthMiddleware vì chưa có đăng nhập => token hết hạn => lỗi
router.get('/posts',  getAllPosts);
router.get('/:postId',  getSinglePost);
router.get('/user/:id', getPostByUserId);
router.delete('/deletePost/:postId',  deletePost);
router.delete('/deleteComment/:postId/:commentId',  deleteComment);
router.delete('/deleteReply/:postId/:commentId/:replyId',  deleteReply);

module.exports = router;