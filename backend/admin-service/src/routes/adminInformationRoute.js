const express = require("express");
const { getAdminInfo, updateAdminInfo, uploadProfilePicture } = require('../controllers/adminInformationController');
const authMiddleware = require('../middleware/authMiddleware');
const { multerMiddleware } = require('../config/cloudinary');

const router = express.Router();
// Route lấy thông tin admin
router.get('/account/:id', authMiddleware, getAdminInfo);

// Route cập nhật thông tin admin
router.put('/account/:id', authMiddleware, updateAdminInfo);

// Route upload ảnh đại diện
router.post('/account', authMiddleware, multerMiddleware.single('profilePicture'), uploadProfilePicture);
module.exports = router;