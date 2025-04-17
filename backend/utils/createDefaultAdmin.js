const bcrypt = require('bcryptjs');
const Admin = require('../model/Admin');
const mongoose = require('mongoose');

const createDefaultAdmin = async () => {
    try {
        // Kiểm tra và hiển thị danh sách admin hiện có
        const existingAdmins = await Admin.find({ role: 'admin' });

        if (existingAdmins.length > 0) {
            console.log('Danh sách tài khoản admin hiện có:');
            existingAdmins.forEach(admin => {
                console.log(`- Email: ${admin.email}, Username: ${admin.username}`);
            });
        } else {
            console.log('Không có tài khoản admin nào trong hệ thống!');
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra tài khoản admin:', error);
    }
};

module.exports = createDefaultAdmin;