// frontend-user/src/service/auth.service.js
import axiosInstance from "./url.service";
import { io } from "socket.io-client";

// Đăng ký người dùng
export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Đăng nhập người dùng
export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/login', userData, { withCredentials: true });

        if (response.data.data.token) {
            localStorage.setItem("token", response.data.data.token); // Lưu token vào localStorage

            // Kết nối socket sau khi đăng nhập thành công
            const socket = io("ws://localhost:8900", {
                auth: {
                    token: response.data.data.token
                }
            });

            // Lắng nghe sự kiện kết nối thành công
            socket.on("connect", () => {
                console.log("✅ Socket connected");
                // Thêm user vào danh sách online
                socket.emit("addUser", response.data.data.user._id);
            });

            // Lắng nghe sự kiện lỗi
            socket.on("connect_error", (err) => {
                console.error("❌ Socket connection error:", err);
            });

            // Lưu socket vào window để có thể sử dụng ở các component khác
            window.socket = socket;
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Đăng xuất người dùng
export const logout = async () => {
    try {
        // Đóng socket connection trước khi đăng xuất
        if (window.socket) {
            window.socket.close();
            window.socket = null;
        }

        const response = await axiosInstance.get('/auth/logout');
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAccount = async () => {
    try {
        // Đóng socket connection trước khi xóa tài khoản
        if (window.socket) {
            window.socket.close();
            window.socket = null;
        }

        const response = await axiosInstance.delete('/auth/deleteAccount');
        localStorage.removeItem("token"); // Xóa token khỏi localStorage
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Kiểm tra xem người dùng đã đăng nhập chưa
export const checkUserAuth = async () => {
    try {
        const response = await axiosInstance.get('users/check-auth');
        if (response.data.status === 'success') {
            // Nếu đã đăng nhập và chưa có socket connection
            if (!window.socket) {
                const token = localStorage.getItem("token");
                if (token) {
                    const socket = io("ws://localhost:8900", {
                        auth: {
                            token: token
                        }
                    });

                    // Lắng nghe sự kiện kết nối thành công
                    socket.on("connect", () => {
                        console.log("✅ Socket connected");
                        // Thêm user vào danh sách online
                        socket.emit("addUser", response.data.data._id);
                    });

                    // Lắng nghe sự kiện lỗi
                    socket.on("connect_error", (err) => {
                        console.error("❌ Socket connection error:", err);
                    });

                    window.socket = socket;
                }
            }
            return { isAuthenticated: true, user: response?.data?.data };
        } else if (response.status === 'error') {
            return { isAuthenticated: false };
        }
    } catch (error) {
        console.log(error);
        return { isAuthenticated: false };
    }
}