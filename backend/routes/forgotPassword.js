const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controllers/forgotPasswordController');

// Gửi mã xác thực
router.post('/send-code', forgotPasswordController.sendVerificationCode);

// Xác thực mã code
router.post('/verify-code', forgotPasswordController.verifyCode);

// Đặt lại mật khẩu
router.post('/reset-password', forgotPasswordController.resetPassword);

module.exports = router;