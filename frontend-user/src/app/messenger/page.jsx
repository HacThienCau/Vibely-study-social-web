"use client";
import { Input } from "@/components/ui/input";
import { checkUserAuth } from "@/service/auth.service";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatOnline from "../components/chatOnline/ChatOnline";
import Conversation from "../components/conversations/Conversation";
import Message from "../components/message/Message";
import "./messenger.css";

const Messenger = () => {
    const [user, setUser] = useState(null);
    // const [conversations, setConversations] = useState([]);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [currentChat, setCurrentChat] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef();
    const socket = useRef();

    // Kết nối socket
    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        }
        );
    }, []);

    // Thêm tin nhắn mới vào danh sách tin nhắn
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    // Thêm user vào danh sách online
    useEffect(() => {
        if (user?._id) {  // Dùng optional chaining để tránh lỗi
            socket.current.emit("addUser", user._id);
            socket.current.on("getUsers", (users) => {
                setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
            });
        }
    }, [user]);



    // Kiểm tra xác thực người dùng
    useEffect(() => {
        checkUserAuth().then((res) => {
            if (!res.isAuthenticated) {
                window.location.href = "/user-login";
            } else {
                console.log("✅ User logged in:", res.user);
                setUser(res.user);
            }
        });
    }, []);

    // Lấy danh sách bạn bè của user
    useEffect(() => {
        if (!user || !user._id) return;

        const getFriends = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`https://vibely-study-social-web.onrender.com/users/mutual-friends/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Danh sách bạn bè:", res.data.data);
                setFriends(res.data.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách bạn bè:", err);
            }
        };
        getFriends();
    }, [user]);

    // Lấy danh sách hội thoại của user
    // useEffect(() => {
    //     if (!user || !user._id) return;

    //     const getConversations = async () => {
    //         try {
    //             const res = await axios.get(`https://vibely-study-social-web.onrender.com/conversation/${user._id}`);
    //             console.log("📨 Danh sách hội thoại:", res.data);
    //             setConversations(res.data);
    //         } catch (err) {
    //             console.error("❌ Lỗi khi lấy hội thoại:", err);
    //         }
    //     };

    //     getConversations();
    // }, [user]);

    // Lấy tin nhắn khi currentChat thay đổi
    useEffect(() => {
        if (!currentChat || !currentChat._id) return;

        const getMessages = async () => {
            try {
                const res = await axios.get(`https://vibely-study-social-web.onrender.com/message/${currentChat._id}`);
                setMessages(res.data);
            } catch (err) {
                console.error("❌ Lỗi khi lấy tin nhắn:", err);
            }
        };

        getMessages();
    }, [currentChat]);

    // Log để kiểm tra state thay đổi
    useEffect(() => {
        console.log("🔄 Cập nhật CurrentChat:", currentChat);
    }, [currentChat]);

    // Gửi tin nhắn mới
    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        // Gửi tin nhắn qua socket
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: currentChat.members.find((member) => member !== user._id),
            text: newMessage,
        });


        try {
            const res = await axios.post("https://vibely-study-social-web.onrender.com/message", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.error("❌ Lỗi khi gửi tin nhắn:", err);
        }
    };


    // Nhận tin nhắn từ socket
    useEffect(() => {
        socket.current.on("getMessage", (data) => {
            setMessages([...messages, data]);
        }
        );
    }, [messages]);


    // Cuộn xuống cuối cùng khi có tin nhắn mới
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Tìm kiếm bạn bè
    const searchFriend = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
    
        if (value.length === 0) {
            setFilteredFriends([]);
            return;
        }
    
        const filtered = friends.filter((friend) =>
            friend.username.toLowerCase().includes(value)
        );
    
        setFilteredFriends(filtered);
    };
    
    const displayedFriends = searchValue.length > 0 ? filteredFriends : friends;

    return (
        <div className="pt-14 messenger">
            {/* Sidebar danh sách hội thoại */}
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <h1 className="text-xl font-bold mb-6">Đoạn chat</h1>
                    {/* Ô tìm kiếm */}
                    <div className="relative w-full mb-4">
                        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-800" size={20} />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm trên Messenger"
                            className="pl-10 w-full h-10 bg-[#F0F2F5] rounded-full border-none chatMenuInput"
                            style={{ textIndent: "40px" }}
                            value={searchValue}
                            onChange={searchFriend}
                        />
                    </div>

                    {/* Danh sách hội thoại */}
                    {displayedFriends.length > 0 ? (
                        displayedFriends.map((friend) => (
                            <button
                                key={friend._id}
                                onClick={async () => {
                                    try {
                                        const res = await axios.post(`http://localhost:8080/conversation`, {
                                            senderId: user._id,
                                            receiverId: friend._id,
                                        });
                                        setCurrentChat(res.data);
                                        setSelectedFriend(friend);
                                    } catch (err) {
                                        console.error("Lỗi tạo hoặc lấy hội thoại:", err);
                                    }
                                }}
                                className="w-full text-left"
                            >
                                <Conversation friend={friend} currentChat={currentChat}/>
                            </button>
                        ))
                        ) : (   
                        <p>Không có bạn bè nào</p>
                    )}
                </div>
            </div>

            {/* Khung chat */}
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            {/* Hiển thị ảnh + tên người đang chat */}
                            {selectedFriend && (
                                <div className="flex items-center gap-4 pr-4 pl-0 py-2 border-b border-gray-300">
                                    <img
                                        src={selectedFriend.profilePicture || "/images/user_default.jpg"}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="font-medium">{selectedFriend.username}</span>
                                </div>
                            )}         
                    
                            {/* Danh sách tin nhắn */}
                            <div className="chatBoxTop">
                                {messages.length > 0 ? (
                                    messages.map((msg) => (
                                        <div key={msg._id} ref={scrollRef}>
                                            <Message message={msg} own={msg.sender === user._id} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <p className="">Chưa có tin nhắn nào</p>
                                    </div>
                                )}
                            </div>
                            {/* Gửi tin nhắn */}
                            <div className="chatBoxBottom">
                                <textarea className="chatMessageInput"
                                    placeholder="Aa"
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                                ></textarea>
                                <img src="images/send.png" alt="send" onClick={handleSubmit} className="chatSubmitButton" />
                            </div>
                        </>
                    ) : (
                        <div className="noConversationContainer">
                            <img src="images/dog_study_1.png" className="chatImage" />
                            <span className="noConversationText">
                                Bắt đầu trò chuyện thảo luận học tập cùng bạn bè!
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Danh sách bạn bè online */}
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    {user && <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} setSelectedFriend={setSelectedFriend}/>}
                </div>
            </div>
        </div>
    );
};

export default Messenger;
