const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");

const loginAdmin = async ({ email, password }) => {
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new Error("Email hoặc mật khẩu không chính xác");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error("Email hoặc mật khẩu không chính xác");
    }

    const accessToken = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { admin, accessToken };
};

const logoutAdmin = () => {
    return { message: "Đăng xuất thành công" };
};

module.exports = { loginAdmin, logoutAdmin };
