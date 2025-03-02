const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { followUser, unfollowUser, deleteUserFromRequest, getAllFriendsRequest, getAllUserForRequest, getAllMutualFriends, getAllUser, getUserProfile, checkUserAuth} = require('../controllers/userController');
const { createOrUpdateUserBio, updateCoverPicture, updateUserProfile } = require('../controllers/createOrUpdateController');
const { multerMiddleware } = require('../config/cloudinary');
const router = express.Router();

// Route theo dõi người dùng
router.post('/follow', authMiddleware, followUser);

// Route bỏ theo dõi người dùng
router.post('/unfollow', authMiddleware, unfollowUser);

// Route xóa lời mời kết bạn
router.post('/friend-request/remove', authMiddleware, deleteUserFromRequest);

// Route lấy tất cả lời mời kết bạn
router.get('/friend-request',authMiddleware, getAllFriendsRequest )

// Route lấy tất cả đề xuất kết bạn
router.get('/user-to-request',authMiddleware, getAllUserForRequest)

// Route lấy tất cả bạn chung
router.get('/mutual-friends',authMiddleware, getAllMutualFriends)

// Route lấy tất cả người dùng cho việc tìm kiếm
router.get('/',authMiddleware,getAllUser)

// Route lấy thông tin người dùng
router.get('/profile/:userId',authMiddleware, getUserProfile)

// Route kiểm tra người dùng đã đăng nhập chưa
router.get('/check-auth',authMiddleware, checkUserAuth)

// Route tạo hoặc cập nhật tiểu sử người dùng
router.put('/bio/:userId',authMiddleware, createOrUpdateUserBio)

// Route cập nhật hồ sơ cho người dùng
router.put('/profile/:userId',authMiddleware, multerMiddleware.single('profilePicture'),updateUserProfile)

// Route cập nhật ảnh bìa cho người dùng
router.put('/profile/cover-picture/:userId',authMiddleware,multerMiddleware.single('coverPicture') ,updateCoverPicture)

module.exports = router;