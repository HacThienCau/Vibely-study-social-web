// frontend-user/src/context/SocketContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Kiểm tra đăng nhập
        const token = localStorage.getItem("token");
        if (token) {
            // Kết nối socket
            const newSocket = io("ws://localhost:8900", {
                auth: {
                    token: token
                }
            });

            // Lắng nghe sự kiện kết nối thành công
            newSocket.on("connect", () => {
                console.log("✅ Socket connected");
            });

            // Lắng nghe sự kiện lỗi
            newSocket.on("connect_error", (err) => {
                console.error("❌ Socket connection error:", err);
            });

            // Lắng nghe sự kiện ngắt kết nối
            newSocket.on("disconnect", () => {
                console.log("❌ Socket disconnected");
            });

            // Lưu socket vào state
            setSocket(newSocket);

            // Cleanup khi component unmount
            return () => {
                newSocket.close();
            };
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};