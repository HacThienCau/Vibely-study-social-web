const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { followUser, unfollowUser, deleteUserFromRequest } = require('../controllers/userController');
const router = express.Router();

// Route theo dõi người dùng
router.post('/follow', authMiddleware, followUser);

// Route bỏ theo dõi người dùng
router.post('/unfollow', authMiddleware, unfollowUser);

// Route xóa lời mời kết bạn
router.post('/remove/friend-request', authMiddleware, deleteUserFromRequest);


module.exports = router;