const bcrypt = require('bcrypt');
const Admin = require('../model/Admin');
const mongoose = require('mongoose');

const createDefaultAdmin = async () => {
    try {
        // Kiểm tra xem đã có admin chưa
        const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
        
        if (!existingAdmin) {
            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);

            // Tạo admin mới
            const admin = new Admin({
                firstName: 'Admin',
                lastName: 'System',
                username: 'admin',
                email: 'admin@gmail.com',
                phone: '0123456789',
                password: hashedPassword,
                nationality: 'Vietnam',
                city: 'Ho Chi Minh',
                role: 'admin'
            });

            await admin.save();
            console.log('Tài khoản admin gmail:admin@gmail.com, mk:admin123 đã được tạo thành công!');
        } else {
            console.log('Tài khoản admin đã tồn tại!');
        }
    } catch (error) {
        console.error('Lỗi khi tạo tài khoản admin mặc định:', error);
    }
};

module.exports = createDefaultAdmin;