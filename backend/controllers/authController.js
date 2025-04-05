// RESTful API for Users
// Xác thực token của người dùng trước khi họ truy cập API
// Được sử dụng trong routes/userRoutes.js để bảo vệ API
const User = require('../model/User');
const { generateToken } = require('../utils/generateToken');
const response = require('../utils/responseHandler');
const bcrypt = require('bcryptjs');
const Post = require("../model/Post");
const Story = require("../model/Story");

const registerUser = async (req, res) => {
    try {
        const { username, email, password, gender, dateOfBirth } = req.body;
        const existingUser = await User.findOne({ email });
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
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
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
        const user = await User.findOne({ email });
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
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
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
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
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

        //Tìm tất cả bài viết mà user này đã comment, reply hoặc react
        const posts = await Post.find({
            $or: [
                { user: userId },
                { "comments.user": userId },
                { "comments.replies.user": userId }, 
                { "reactions.user._id": userId }, 
                { "comments.reactions.user": userId }
            ]
        });
        for (const post of posts) {

            if (post.user._id.toString() === userId) {
                await Post.findByIdAndDelete(post._id);
                continue;
            }
              
            // Xóa tất cả comments của user
            console.log(post.comments.filter(comment => comment.user._id.toString() !== userId))
            post.comments = post.comments.filter(comment => comment.user._id.toString() !== userId);
            post.commentCount = post.comments.length;
            
            // Xóa tất cả replies của user trong comments
            post.comments.forEach(comment => {
                comment.replies = comment.replies.filter(reply => reply.user._id.toString() !== userId);
            });
            
            // Xóa tất cả reactions của user trên bài viết
            post.reactions = post.reactions.filter(reaction => reaction.user._id.toString() !== userId);
            // Cập nhật lại reactionStats
            post.reactionStats = {
                like: post.reactions.filter(r => r.type === "like").length,
                love: post.reactions.filter(r => r.type === "love").length,
                haha: post.reactions.filter(r => r.type === "haha").length,
                wow: post.reactions.filter(r => r.type === "wow").length,
                sad: post.reactions.filter(r => r.type === "sad").length,
                angry: post.reactions.filter(r => r.type === "angry").length
            };

            // Xóa tất cả reactions của user trên comments
            post.comments.forEach(comment => {
                comment.reactions = comment.reactions.filter(reaction => reaction.user.toString() !== userId);
            });

            await post.save();
        }
        
        const stories = await Story.find({
            $or: [
                { "user": userId }, 
                { "reactions.user": userId }, 
            ]
        });
        for (const story of stories) {
            if (story.user._id.toString() === userId) {
                await Story.findByIdAndDelete(story._id);
                continue;
            }
            // Xóa tất cả reactions của user trên bài viết
            story.reactions = story.reactions.filter(reaction => reaction.user.toString() !== userId);

            // Cập nhật lại reactionStats
            story.reactionStats = {
                "tym":  story.reactions.length,
            }
            await story.save();
        }
         // Xóa user khỏi danh sách follower của những người khác
        await User.updateMany(
            { followers: userId },
            { $pull: { followers: userId }, $inc: { followerCount: -1 } }
        );

        // Xóa user khỏi danh sách following của những người khác
        await User.updateMany(
            { followings: userId },
            { $pull: { followings: userId }, $inc: { followingCount: -1 } }
        );

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return response(res, 404, "Người dùng không tồn tại");
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




