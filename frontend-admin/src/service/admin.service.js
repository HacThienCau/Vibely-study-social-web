import axiosInstance from "./urlAdmin.service";

// Đăng nhập admin
export const loginAdmin = async (adminData) => {
    try {
        const response = await axiosInstance.post('/admin-auth/login', adminData, { withCredentials: true });

        if (response.data.data.token) {
            localStorage.setItem("admin_token", response.data.data.token);
        }

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Đăng xuất admin
export const logoutAdmin = async () => {
    try {
        const response = await axiosInstance.get('/admin-auth/logout');
        localStorage.removeItem("admin_token");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Kiểm tra xem admin đã đăng nhập chưa
export const checkAdminAuth = async () => {
    try {
        const response = await axiosInstance.get('/admin-auth/check-auth');
        if (response.data.status === 'success') {
            return { isAuthenticated: true, admin: response?.data?.data };
        } else if (response.status === 'error') {
            return { isAuthenticated: false };
        }
    } catch (error) {
        console.log(error);
        return { isAuthenticated: false };
    }
}; 