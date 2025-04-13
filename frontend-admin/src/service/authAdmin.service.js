import axios from 'axios';

// Sửa lại URL API cho đúng với backend của bạn
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8081';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Đăng nhập Admin
export const loginAdmin = async (adminData) => {
    try {
        const fullUrl = `${API_URL}/admin/auth/login`;
        console.log('Đang gửi request đăng nhập đến:', fullUrl);
        console.log('Dữ liệu đăng nhập:', adminData);

        const response = await axios.post(fullUrl, adminData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Phản hồi từ server:', response.data);

        if (response.data?.status === 'success' && response.data?.data?.token) {
            // Lưu token vào localStorage
            localStorage.setItem('adminToken', response.data.data.token);
            return response.data;
        } else {
            throw new Error(response.data?.message || 'Đăng nhập thất bại');
        }
    } catch (error) {
        console.error("Lỗi đăng nhập:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        });
        throw error;
    }
};

// Đăng xuất Admin
export const logoutAdmin = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            throw new Error('Không tìm thấy token đăng nhập');
        }

        const response = await axios.post(`${API_URL}/admin/auth/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        localStorage.removeItem('adminToken');
        return response.data;
    } catch (error) {
        console.error("Lỗi đăng xuất:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Kiểm tra xem Admin đã đăng nhập chưa
export const checkAdminAuth = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            return { isAuthenticated: false };
        }

        const response = await axios.get(`${API_URL}/admin/auth/check-auth`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        return response.data?.status === 'success'
            ? { isAuthenticated: true, admin: response.data?.data }
            : { isAuthenticated: false };
    } catch (error) {
        console.error("Lỗi kiểm tra đăng nhập:", error.response?.data?.message || error.message);
        return { isAuthenticated: false };
    }
};

// Cập nhật mật khẩu Admin
export const updateAdminPassword = async (passwordData) => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            throw new Error('Không tìm thấy token đăng nhập');
        }

        const response = await axios.put(
            `${API_URL}/admin/auth/update-password`,
            passwordData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        console.error("Lỗi cập nhật mật khẩu:", error.response?.data?.message || error.message);
        throw error;
    }
};