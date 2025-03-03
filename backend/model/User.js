const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    profilePicture: {
        type: String,
        default: null,
    },
    coverPicture: {
        type: String,
        default: null,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
    status: {
        type: String,
        enum: ['delete', 'active'],
        default: 'active',
    },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    postsCount: {
        type: Number,
        default: 0,
    },
    followerCount: {
        type: Number,
        default: 0,
    },
    followingCount: {
        type: Number,
        default: 0,
    },

    bio: { 
        type: String,
        default: null,
    },

    // 🔹 Học tập - Lưu lịch sự kiện của người dùng (bài giảng, kiểm tra, deadline, sự kiện)
    calendarEvents: [{
        title: { type: String, required: true },  
        description: { type: String, default: "" }, 
        date: { type: Date, required: true },  
    }],

    // 🔹 Học tập - Lưu danh sách tài liệu đã đọc
    readDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],

    // 🔹 Học tập - Lưu danh sách tài liệu đã mua
    purchasedDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
