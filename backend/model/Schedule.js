const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true, trim: true, maxlength: 100 }, // Giới hạn độ dài
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    categoryColor: { type: String, required: true, default: '#0000FF' } // Thêm màu mặc định
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Schedule', ScheduleSchema);
