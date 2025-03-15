const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const response = require("../utils/responseHandler");

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return response(res, 400, "Email hoặc mật khẩu không chính xác");
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return response(res, 400, "Email hoặc mật khẩu không chính xác");
        }

        const accessToken = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Lưu token vào cookie
        res.cookie("auth_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return response(res, 200, "Đăng nhập thành công", { token: accessToken });
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return response(res, 500, "Lỗi server");
    }
};

const logoutAdmin = (req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    });
    return response(res, 200, "Đăng xuất thành công");
};

module.exports = { loginAdmin, logoutAdmin };
