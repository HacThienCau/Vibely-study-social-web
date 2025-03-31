const jwt = require("jsonwebtoken");
const response = require("../utils/responseHandler");
const Admin = require("../models/Admin");

const adminAuthMiddleware = async (req, res, next) => {
    try {
        // Lấy token từ cookie hoặc header
        const authToken = req?.cookies?.auth_token || req?.headers?.authorization?.split(" ")[1];

        if (!authToken) {
            return response(res, 401, "Bạn cần đăng nhập với quyền admin để thực hiện thao tác này");
        }

        // Giải mã token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        // Kiểm tra user có phải admin không
        const admin = await Admin.findById(decoded.id);
        if (!admin || admin.role !== "admin") {
            return response(res, 403, "Bạn không có quyền truy cập");
        }

        req.admin = admin; // Lưu thông tin admin vào request
        next(); // Cho phép tiếp tục
    } catch (error) {
        console.error("Lỗi xác thực admin:", error.message);
        return response(res, 401, "Token không hợp lệ hoặc đã hết hạn");
    }
};

module.exports = adminAuthMiddleware;
