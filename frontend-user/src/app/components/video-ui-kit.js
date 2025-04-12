// frontend-user/src/app/components/video-ui-kit.js
"use client";
import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRouter } from "next/navigation";
import axios from "axios";

const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || "";

export default function VideoUIKit({ currentChat, user, selectedFriend }) {
	const containerRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		if (!containerRef.current || !currentChat || !user || !selectedFriend) {
			console.log('Missing required props:', {
				containerRef: !!containerRef.current,
				currentChat,
				user,
				selectedFriend
			});
			return;
		}

		// Tạo room ID từ ID của cuộc trò chuyện
		const roomID = currentChat._id;
		const userID = user._id;
		const userName = user.username;

		console.log('Starting video call with:', { roomID, userID, userName });

		// Gọi API tạo cuộc gọi
		const createCall = async () => {
			try {
				const token = localStorage.getItem("token");
				console.log('Creating call with token:', token);

				const response = await axios.post('http://localhost:8080/video-call/create', {
					callerId: user._id,
					receiverId: selectedFriend._id,
					roomId: roomID
				}, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				console.log('Call created successfully:', response.data);

				// Gửi thông báo qua socket
				if (window.socket) {
					window.socket.emit("incoming-call", {
						roomId: roomID,
						callerId: user._id,
						receiverId: selectedFriend._id,
						callerName: user.username
					});
				}

				// Chuyển đến trang video call với room ID
				router.push(`/video-call?roomID=${roomID}&callerId=${user._id}&receiverId=${selectedFriend._id}`);
			} catch (error) {
				console.error('Error in video call:', error);
				alert('Có lỗi xảy ra khi tạo cuộc gọi: ' + error.message);
			}
		};

		createCall();
	}, [currentChat, user, selectedFriend]);

	return <div className="myCallContainer" ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}