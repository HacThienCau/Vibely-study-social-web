const jwt = require("jsonwebtoken");
const response = require("../utils/responseHandler");

const authMiddleware = (req, res, next) => {
    try {
        // Lấy token từ cookie hoặc Authorization header
        const authToken = req?.cookies?.auth_token || req?.headers?.authorization?.split(" ")[1];

        if (!authToken) {
            return response(res, 401, "Bạn cần đăng nhập để thực hiện thao tác này");
        }

        // Xác thực token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decoded;

        next(); // Cho phép tiếp tục nếu token hợp lệ
    } catch (error) {
        console.error("Lỗi xác thực:", error.message);
        return response(res, 401, "Token không hợp lệ hoặc đã hết hạn");
    }
};

module.exports = authMiddleware;
