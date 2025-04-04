// RESTful API for Users
// Xác thực token của người dùng trước khi họ truy cập API
// Được sử dụng trong routes/userRoutes.js để bảo vệ API
const User = require('../model/User');
const { generateToken } = require('../utils/generateToken');
const response = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
const registerUser = async (req, res) => {
    try {
        const { username, email, password, gender, dateOfBirth } = req.body;
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return response(res, 400, 'Email đã tồn tại');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth,
            profilePicture: null,   
            coverPicture: null,     
            status: "active",       
            postsCount: 0,          
            followerCount: 0,       
            followingCount: 0,      
            bio: null,                
            role: "user",           
        });
        await newUser.save();
        const accessToken = generateToken(newUser);
        res.cookie("auth_token", accessToken, {
            httpOnly: true,
        });
        return response(res, 201, 'Đăng ký thành công',
            {
                username: newUser.username,
                email: newUser.email
            }
        )
    }
    catch (error) {
        return response(res, 500, 'Đăng ký thất bại', error.message);
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Kiểm tra email
        const user = await User.findOne({ email});
        if (!user) {
            return response(res, 400, 'Email không tồn tại');
        }
        // Kiểm tra mật khẩu
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return response(res, 400, 'Mật khẩu không chính xác');
        }
        const accessToken = generateToken(user);
        res.cookie("auth_token", accessToken, {
            httpOnly: true,
        });
        return response(res, 200, 'Đăng nhập thành công',
            {
                username: user.username,
                email: user.email,
                token: accessToken
            }
        )
    }
    catch (error) {
        return response(res, 500, 'Đăng nhập thất bại', error.message);
    }
}
const logoutUser = async (req, res) => { 
    try {
        res.cookie("auth_token", "", {
            httpOnly: true, //Cookie chỉ có thể được truy cập bởi máy chủ (bảo mật hơn, không thể bị JavaScript đọc)
            expires: new Date(0), //Thiết lập thời gian hết hạn về mốc thời gian 0 (01/01/1970), khiến cookie bị xóa ngay lập tức
        });
        return response(res, 200, 'Đăng xuất thành công');
    }
    catch (error) {
        return response(res, 500, 'Đăng xuất thất bại', error.message);
    }
}

const deleteAccount = async (req, res) => { 
    try {
        const userId = req.user.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        return response(res, 200, 'Xóa tài khoản thành công');
    }
    catch (error) {
        return response(res, 500, 'Xóa tài khoản thất bại', error.message);
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.userId;

        // Tìm user trong database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        // Kiểm tra mật khẩu cũ
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu cũ không chính xác'
            });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu mới
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Đổi mật khẩu thành công'
        });
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đổi mật khẩu'
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser, deleteAccount, changePassword };




