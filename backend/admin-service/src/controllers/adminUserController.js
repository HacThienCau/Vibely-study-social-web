const User = require("../models/User");
const Post = require("../models/Post");

// Lấy danh sách tất cả users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password')
            .populate('posts', '_id')
            .populate('followers', 'username profilePicture')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách người dùng',
            error: error.message
        });
    }
};

// Xóa user theo ID
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Kiểm tra user có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        // Xóa tất cả bài viết của user
        await Post.deleteMany({ author: userId });

        // Xóa user
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: 'Xóa người dùng thành công'
        });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa người dùng',
            error: error.message
        });
    }
};

// Tìm kiếm users
exports.searchUsers = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập từ khóa tìm kiếm'
            });
        }

        const users = await User.find({
            $or: [
                { username: { $regex: q, $options: 'i' } },
                { email: { $regex: q, $options: 'i' } }
            ]
        }, '-password')
            .populate('posts', '_id')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error in searchUsers:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tìm kiếm người dùng',
            error: error.message
        });
    }
}; 