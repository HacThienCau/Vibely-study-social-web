// backend/socket/index.js
const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    console.log(`✅ User ${userId} added to online list`);
  }
};

const removeUser = (socketId) => {
  const user = users.find(user => user.socketId === socketId);
  if (user) {
    users = users.filter((user) => user.socketId !== socketId);
    console.log(`❌ User ${user.userId} removed from online list`);
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`⚡ New socket connection: ${socket.id}`);

  // Xử lý authentication
  socket.on("authenticate", (token) => {
    // Verify token và lấy userId
    // Sau đó thêm vào danh sách online
    const userId = "user_id_from_token"; // Thay bằng logic verify token thực tế
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Nhận userId từ frontend
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Gửi tin nhắn
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", { senderId, text });
    }
  });

  socket.on("join-video-call", (data) => {
    console.log("User joined video call:", data);
    socket.join(data.roomId);
  });

  socket.on("leave-video-call", (data) => {
    console.log("User left video call:", data);
    socket.leave(data.roomId);
  });

  socket.on("video-call-error", (data) => {
    console.error("Video call error:", data);
  });
  // Khi user ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`❌ Socket disconnected: ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});