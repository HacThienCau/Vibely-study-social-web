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
router.post('/', authMiddleware, createSchedule);

// Lấy tất cả lịch trình của người dùng
router.get('/', authMiddleware, getUserSchedules);

// Lấy chi tiết một lịch trình theo ID
router.get('/:scheduleId', authMiddleware, getScheduleById);

// Lấy chi tiết một lịch trình theo ID người dùng
router.get('/user/:userId', authMiddleware, getScheduleByIdUser);

// Cập nhật lịch trình
router.put('/:scheduleId', authMiddleware, updateSchedule);

// Xóa lịch trình
router.delete('/:scheduleId', authMiddleware, deleteSchedule);

module.exports = router;
