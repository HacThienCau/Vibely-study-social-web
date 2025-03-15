const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controllers/adminDashboardController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.get('/dashboard', adminAuthMiddleware, getAdminDashboard);
module.exports = router;