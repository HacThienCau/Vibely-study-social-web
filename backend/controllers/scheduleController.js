const Schedule = require("../model/Schedule");
const response = require("../utils/responseHandler");

// Tạo lịch trình mới
const createSchedule = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { subject, startTime, endTime, categoryColor } = req.body;

        if (!subject || !startTime || !endTime) {
            return response(res, 400, "Vui lòng cung cấp đầy đủ thông tin lịch trình");
        }

        const newSchedule = new Schedule({
            user: userId,
            subject,
            startTime,
            endTime,
            categoryColor: categoryColor || "#0000FF"
        });

        await newSchedule.save();
        return response(res, 201, "Lịch trình đã được tạo thành công", newSchedule);
    } catch (error) {
        return response(res, 500, "Lỗi máy chủ nội bộ", error.message);
    }
};

// Lấy danh sách lịch trình của người dùng
const getUserSchedules = async (req, res) => {
    try {
        const userId = req.user.userId;
        const schedules = await Schedule.find({ user: userId }).sort({ startTime: 1 });

        return response(res, 200, "Lấy danh sách lịch trình thành công", schedules);
    } catch (error) {
        return response(res, 500, "Lỗi máy chủ nội bộ", error.message);
    }
};

// Cập nhật lịch trình
const updateSchedule = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { scheduleId, subject, startTime, endTime, categoryColor } = req.body;

        const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
        if (!schedule) {
            return response(res, 404, "Lịch trình không tồn tại hoặc bạn không có quyền chỉnh sửa");
        }

        schedule.subject = subject || schedule.subject;
        schedule.startTime = startTime || schedule.startTime;
        schedule.endTime = endTime || schedule.endTime;
        schedule.categoryColor = categoryColor || schedule.categoryColor;

        await schedule.save();
        return response(res, 200, "Cập nhật lịch trình thành công", schedule);
    } catch (error) {
        return response(res, 500, "Lỗi máy chủ nội bộ", error.message);
    }
};

// Xóa lịch trình
const deleteSchedule = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { scheduleId } = req.body;

        const schedule = await Schedule.findOneAndDelete({ _id: scheduleId, user: userId });
        if (!schedule) {
            return response(res, 404, "Lịch trình không tồn tại hoặc bạn không có quyền xóa");
        }

        return response(res, 200, "Xóa lịch trình thành công");
    } catch (error) {
        return response(res, 500, "Lỗi máy chủ nội bộ", error.message);
    }
};

// Lấy chi tiết một lịch trình
const getScheduleById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { scheduleId } = req.params;

        const schedule = await Schedule.findOne({ _id: scheduleId, user: userId });
        if (!schedule) {
            return response(res, 404, "Không tìm thấy lịch trình");
        }

        return response(res, 200, "Lấy chi tiết lịch trình thành công", schedule);
    } catch (error) {
        return response(res, 500, "Lỗi máy chủ nội bộ", error.message);
    }
};

module.exports = {
    createSchedule,
    getUserSchedules,
    updateSchedule,
    deleteSchedule,
    getScheduleById
};
