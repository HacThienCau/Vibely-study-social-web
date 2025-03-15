const User = require("../model/User");
const Post = require("../model/Post");
const Document = require("../model/Document");
const Inquiry = require("../model/Inquiry");

// Hàm nhóm dữ liệu theo ngày, tháng, năm
const groupByTime = async (Model, timeUnit) => {
    let groupId;

    if (timeUnit === "day") {
        groupId = {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
        };
    } else if (timeUnit === "month") {
        groupId = {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
        };
    } else {
        groupId = { year: { $year: "$createdAt" } };
    }

    return await Model.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), 0, 1), // Lấy từ đầu năm
                },
            },
        },
        {
            $group: {
                _id: groupId,
                count: { $sum: 1 },
            },
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
        },
    ]);
};

// API lấy dữ liệu tổng quan
const getAdminDashboard = async (req, res) => {
    try {
        // Đếm tổng số
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalDocuments = await Document.countDocuments();
        const totalInquiries = await Inquiry.countDocuments();

        // Lấy tham số `timeUnit` từ query (day, month, year)
        const { timeUnit = "month" } = req.query;

        const usersData = await groupByTime(User, timeUnit);
        const postsData = await groupByTime(Post, timeUnit);
        const documentsData = await groupByTime(Document, timeUnit);
        const inquiriesData = await groupByTime(Inquiry, timeUnit);

        return res.status(200).json({
            totalUsers,
            totalPosts,
            totalDocuments,
            totalInquiries,
            usersData,
            postsData,
            documentsData,
            inquiriesData,
        });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin tổng quan:", error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getAdminDashboard };
