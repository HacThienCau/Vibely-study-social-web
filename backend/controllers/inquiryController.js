const Inquiry = require("../model/Inquiry");
const response = require("../utils/responseHandler");

// Tạo thắc mắc mới
const createInquiry = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return response(res, 400, "Vui lòng điền đầy đủ thông tin.");

        const userId = req.user.userId;
        if (!userId) return response(res, 401, "Bạn cần đăng nhập để gửi thắc mắc.");

        const newInquiry = new Inquiry({ userId, message });
        await newInquiry.save();

        return response(res, 201, "Thắc mắc đã được gửi!", newInquiry);
    } catch (error) {
        return response(res, 500, "Lỗi server", error.message);
    }
};

// API lấy danh sách thắc mắc
const getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        return response(res, 201, "Lấy danh sách thắc mắc thành công!", inquiries);
    } catch (error) {
        return response(res, 500, "Lỗi server", error.message);
    }
};

// API cập nhật trạng thái thắc mắc
const updateInquiry = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedInquiry) return response(res, 404, "Không tìm thấy thắc mắc.");

        response(res, 200, "Cập nhật trạng thái thắc mắc thành công", updatedInquiry);
    } catch (error) {
        return response(res, 500, "Lỗi server", error.message);
    }
};     

module.exports = { 
    createInquiry, 
    getInquiries, 
    updateInquiry 
};