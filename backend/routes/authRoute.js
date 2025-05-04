const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser, logoutUser, deleteAccount, changePassword, verifyOTP, sendOTP } = require('../controllers/authController');
const passport = require('passport');
const { generateToken } = require('../utils/generateToken');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);
router.get('/logout', logoutUser);
router.delete('/deleteAccount', authMiddleware, deleteAccount);


// Route gửi OTP
router.post('/send-otp', sendOTP);

// Route xác thực OTP
router.post('/verify-otp', verifyOTP);



//Route Google oauth 
router.get('/google', passport.authenticate('google', {

    scope: ['profile', 'email']
}))

//Route Google callback 
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL}/user-login`,
        session: false
    }),
    async (req, res) => {
        try {
            if (!req.user) {
                console.error('Google callback: No user data received');
                return res.redirect(`${process.env.FRONTEND_URL}/user-login?error=no_user_data`);
            }

            // Log user data for debugging
            console.log('Google callback user data:', {
                id: req.user._id,
                email: req.user.email,
                username: req.user.username
            });

            // Ensure user object has all required fields
            const userData = {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role || 'user'
            };

            // Generate token with proper user data
            const accessToken = generateToken(userData);

            if (!accessToken) {
                console.error('Failed to generate token');
                return res.redirect(`${process.env.FRONTEND_URL}/user-login?error=token_generation_failed`);
            }

            // Set cookie with proper options
            res.cookie("auth_token", accessToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 90 * 24 * 60 * 60 * 1000 // 90 days
            });

            // Redirect to frontend
            res.redirect(`${process.env.FRONTEND_URL}`);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/user-login?error=server_error`);
        }
    }
);
module.exports = router;
