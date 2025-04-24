const Inquiry = require("../model/Inquiry");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const response = require("../utils/responseHandler");
const nodemailer = require("nodemailer");

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Private
const createInquiry = asyncHandler(async (req, res) => {
    const { subject, message } = req.body;

    if (!subject || !message) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const inquiry = await Inquiry.create({
        user: req.user._id,
        subject,
        message,
        status: "pending"
    });

    res.status(201).json({
        success: true,
        data: inquiry
    });
});

// @desc    Get user's inquiries
// @route   GET /api/inquiries
// @access  Private
const getUserInquiries = asyncHandler(async (req, res) => {
    const inquiries = await Inquiry.find({ user: req.user._id })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: inquiries
    });
});

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private
const getInquiry = asyncHandler(async (req, res) => {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
        res.status(404);
        throw new Error("Inquiry not found");
    }

    // Check if the inquiry belongs to the user
    if (inquiry.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized to access this inquiry");
    }

    res.status(200).json({
        success: true,
        data: inquiry
    });
});

// API cập nhật thắc mắc và gửi email phản hồi
const updateInquiry = async (req, res) => {
    try {
        const { status, response } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!status || !response) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin cần thiết." });
        }

        const updatedInquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status, response },
            { new: true }
        ).populate("userId", "username email");

        if (!updatedInquiry)
            return res.status(404).json({ success: false, message: "Không tìm thấy thắc mắc." });

        // Gửi email phản hồi
        await sendResponseEmail(
            updatedInquiry.userId.email,
            "Phản hồi từ Vibely",
            response,
            updatedInquiry.userId?.username
        );

        return res.status(200).json({
            success: true,
            message: "Cập nhật thành công và đã gửi email phản hồi.",
            inquiry: updatedInquiry
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

// Hàm gửi email bằng Nodemailer
const sendResponseEmail = async (to, subject, response, username) => {
    if (!to) {
        console.error("Không có địa chỉ email người nhận!");
        return;
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Email gửi đi
                pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
            },
        });

        let mailOptions = {
            from: `"Vibely Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
                    <h2 style="color: #086280;">Xin chào ${username || "bạn"}!</h2>
                    <p>Cảm ơn bạn đã liên hệ với <strong>Vibely</strong>. Chúng tôi đã nhận được thắc mắc của bạn và dưới đây là phản hồi từ đội ngũ hỗ trợ:</p>
                    
                    <div style="background: #f4f4f4; padding: 10px 15px; border-left: 4px solid #086280; margin: 10px 0;">
                        <p style="margin: 0;"><strong>Phản hồi từ đội ngũ hỗ trợ:</strong></p>
                        <p style="margin: 0;">${response}</p>
                    </div>

                    <p>Nếu bạn cần thêm hỗ trợ, đừng ngần ngại liên hệ lại với chúng tôi.</p>

                    <p>Trân trọng,</p>
                    <p><strong>Đội ngũ Vibely</strong></p>
                </div>
            `,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email đã được gửi:", info.response);
    } catch (error) {
        console.error("Gửi email thất bại:", error);
    }
};

// API xóa thắc mắc
const deleteInquiry = async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) return response(res, 404, "Không tìm thấy thắc mắc.");

        response(res, 200, "Xóa thắc mắc thành công", deletedInquiry);
    } catch (error) {
        return response(res, 500, "Lỗi server", error.message);
    }
};

module.exports = {
    createInquiry,
    getUserInquiries,
    getInquiry,
    updateInquiry,
    deleteInquiry
};