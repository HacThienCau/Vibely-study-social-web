const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001",
      "http://localhost:3002", "http://localhost:3003",
      "https://vibely-study-social-web.onrender.com",
      "http://54.79.253.210:3001",
      "http://54.79.253.210:3000",
      "http://54.79.253.210:3002",
      "http://54.79.253.210:3003",
      "https://vibely-study-social-web.vercel.app",
      "https://vibelyadmin.netlify.app",
      "https://vibelyuser.netlify.app",
      "https://vibely-study-social-web-user.onrender.com",
    ],
  },
});



let users = [];

// Thêm người dùng vào danh sách online
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

// Xóa người dùng khỏi danh sách online
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Lấy thông tin người dùng online theo userId
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`⚡ Người dùng kết nối: ${socket.id}`);

  // Nhận userId từ frontend khi user đăng nhập
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users); // Gửi danh sách người dùng online
  });

  // Gửi tin nhắn
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", { senderId, text });
    } else {
      console.log(`❌ Người nhận (${receiverId}) hiện không online.`);
    }
  });

  // Khi user ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`❌ Người dùng ngắt kết nối: ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
