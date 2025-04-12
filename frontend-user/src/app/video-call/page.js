"use client";
import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams, useRouter } from "next/navigation";
import { checkUserAuth } from "@/service/auth.service";
import axios from "axios";

export default function VideoCallPage() {
    const containerRef = useRef(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isJoining, setIsJoining] = useState(false);
    const zegoInstanceRef = useRef(null);
    const initRef = useRef(false);
    const mountedRef = useRef(false);
    const joinRoomRef = useRef(false);
    const tokenRequestRef = useRef(false);
    const cleanupRef = useRef(false);

    const roomID = searchParams.get("roomID");
    const callerId = searchParams.get("callerId");
    const receiverId = searchParams.get("receiverId");

    useEffect(() => {
        // Chỉ chạy một lần khi component mount
        if (mountedRef.current) return;
        mountedRef.current = true;

        const initVideoCall = async () => {
            try {
                // Kiểm tra nếu đã khởi tạo hoặc đang join
                if (initRef.current || isJoining || zegoInstanceRef.current || joinRoomRef.current || tokenRequestRef.current || cleanupRef.current) {
                    console.log("Already initialized or joining, skipping...");
                    return;
                }

                if (!roomID || !callerId || !receiverId) {
                    console.error("Missing required parameters:", { roomID, callerId, receiverId });
                    router.push("/messenger");
                    return;
                }

                const auth = await checkUserAuth();
                if (!auth.isAuthenticated) {
                    window.location.href = "/user-login";
                    return;
                }

                const user = auth.user;
                const userID = user._id;
                const userName = user.username;

                // Đánh dấu đã request token
                tokenRequestRef.current = true;

                console.log("Requesting Zego token with:", {
                    userID,
                    userName,
                    roomID,
                    callerId,
                    receiverId
                });

                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/video-call/zego-token`, {
                    params: {
                        userID,
                        roomID,
                        callerId,
                        receiverId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log("Zego token response:", response.data);

                const { token: zegoToken, appID } = response.data;

                if (!zegoToken || !appID) {
                    throw new Error("Failed to get Zego token");
                }

                // Đánh dấu đã khởi tạo
                initRef.current = true;
                setIsJoining(true);
                joinRoomRef.current = true;

                // Tạo instance Zego với token mới
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    zegoToken,
                    roomID,
                    userID,
                    userName
                );

                const zp = ZegoUIKitPrebuilt.create(kitToken);
                zegoInstanceRef.current = zp;

                // Thêm kiểm tra container
                if (!containerRef.current) {
                    throw new Error("Container not found");
                }

                // Join room với cấu hình đầy đủ
                zp.joinRoom({
                    container: containerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.OneONoneCall,
                    },
                    showPreJoinView: false,
                    turnOnMicrophoneWhenJoining: true,
                    turnOnCameraWhenJoining: true,
                    onJoinRoom: () => {
                        console.log("✅ Joined room successfully");
                        // Gửi thông báo qua socket khi join thành công
                        if (window.socket) {
                            window.socket.emit("join-video-call", {
                                roomId: roomID,
                                userId: userID,
                                userName: userName
                            });
                        }
                    },
                    onLeaveRoom: () => {
                        console.log("❌ Left room");
                        // Gửi thông báo qua socket khi rời phòng
                        if (window.socket) {
                            window.socket.emit("leave-video-call", {
                                roomId: roomID,
                                userId: userID
                            });
                        }
                        setIsJoining(false);
                        zegoInstanceRef.current = null;
                        initRef.current = false;
                        mountedRef.current = false;
                        joinRoomRef.current = false;
                        tokenRequestRef.current = false;
                        cleanupRef.current = false;
                        router.push("/messenger");
                    },
                    onError: (error) => {
                        console.error("❌ Zego error:", error);
                        // Gửi thông báo qua socket khi có lỗi
                        if (window.socket) {
                            window.socket.emit("video-call-error", {
                                roomId: roomID,
                                userId: userID,
                                error: error.message
                            });
                        }
                        setIsJoining(false);
                        zegoInstanceRef.current = null;
                        initRef.current = false;
                        mountedRef.current = false;
                        joinRoomRef.current = false;
                        tokenRequestRef.current = false;
                        cleanupRef.current = false;
                        alert("Có lỗi xảy ra khi tham gia cuộc gọi: " + error.message);
                        router.push("/messenger");
                    }
                });

            } catch (error) {
                console.error("Error in video call:", error);
                if (error.response) {
                    console.error("Error response:", error.response.data);
                }
                setIsJoining(false);
                zegoInstanceRef.current = null;
                initRef.current = false;
                mountedRef.current = false;
                joinRoomRef.current = false;
                tokenRequestRef.current = false;
                cleanupRef.current = false;
                alert("Có lỗi xảy ra: " + error.message);
                router.push("/messenger");
            }
        };

        initVideoCall();

        return () => {
            if (zegoInstanceRef.current) {
                console.log("Cleaning up Zego instance");
                cleanupRef.current = true;
                zegoInstanceRef.current.destroy();
                zegoInstanceRef.current = null;
                setIsJoining(false);
                initRef.current = false;
                mountedRef.current = false;
                joinRoomRef.current = false;
                tokenRequestRef.current = false;
            }
        };
    }, []); // Empty dependency array to run only once

    return (
        <div className="video-call-container">
            <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
        </div>
    );
}