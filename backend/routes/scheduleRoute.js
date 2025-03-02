const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { 
  createSchedule, 
  getUserSchedules, 
  getScheduleById, 
  updateSchedule, 
  deleteSchedule,
  getScheduleByIdUser
} = require('../controllers/scheduleController');

const router = express.Router();

// Tạo lịch trình mới
router.post('/schedules', authMiddleware, createSchedule);

// Lấy tất cả lịch trình của người dùng
router.get('/schedules', authMiddleware, getUserSchedules);

// Lấy chi tiết một lịch trình theo ID
router.get('/schedules/:id', authMiddleware, getScheduleById);

// Lấy chi tiết một lịch trình theo ID người dùng
router.get('/schedules/user/:userId', authMiddleware, getScheduleByIdUser);

// Cập nhật lịch trình
router.put('/schedules/:id', authMiddleware, updateSchedule);

// Xóa lịch trình
router.delete('/schedules/:id', authMiddleware, deleteSchedule);

module.exports = router;
