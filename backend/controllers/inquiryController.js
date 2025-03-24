const Inquiry = require("../model/Inquiry");
const response = require("../utils/responseHandler");
const User = require("../model/User");
const nodemailer = require("nodemailer");

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
        const { query, status } = req.query;
        let filter = {};

        // Lọc theo status nếu có
        if (status) {
            filter.status = status;
        }

        // Nếu có query, tìm theo message hoặc username/email của User
        if (query) {
            const users = await User.find({
                $or: [
                    { username: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } }
                ]
            }).select("_id");

            const userIds = users.map(user => user._id);

            filter.$or = [
                { message: { $regex: query, $options: "i" } },
                { userId: { $in: userIds } }
            ];
        }

        // Lấy danh sách thắc mắc và populate thông tin user
        const inquiries = await Inquiry.find(filter)
            .populate("userId", "username email")
            .sort({ createdAt: -1 });

        return response(res, 200, "Lấy danh sách thắc mắc thành công!", inquiries);
    } catch (error) {
        return response(res, 500, "Lỗi server", error.message);
    }
};

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
    getInquiries, 
    updateInquiry,
    deleteInquiry
};