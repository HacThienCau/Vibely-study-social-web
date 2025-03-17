const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connect } = require('mongoose');
const connectDb = require('./config/db');
require('dotenv').config();
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const swaggerUi = require('swagger-ui-express');
const conversationRoute = require('./routes/conversationRoute');
const messageRoute = require('./routes/messageRoute');
const Quotation = require('./model/Quotation');
const userRoute = require('./routes/userRoute');
const passport = require('./controllers/googleController');
const scheduleRoute = require('./routes/scheduleRoute');
const chatbotRoute = require('./routes/chatbotRoute');
const documentRoute = require('./routes/documentRoute');
const inquiryRoute = require('./routes/inquiryRoute');
const adminAuthRoute = require('./routes/adminAuthRoute');
const adminDashboardRoute = require('./routes/adminDashboardRoute');
const adminPostRoute = require('./routes/adminPostRoute');
const YAML = require('yamljs');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(express.json());

const session = require('express-session');

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001", "https://vibely-study-social-web.onrender.com"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: isProduction,   // ✅ Bật secure nếu chạy trên HTTPS
            sameSite: isProduction ? "none" : "lax",
            httpOnly: true
        }
    })
);

app.use(cookieParser());
app.set("trust proxy", 1); // 🔥 Cần thiết nếu chạy trên server có proxy

connectDb();
app.use(passport.initialize());

// API Routes
app.use('/auth', authRoute);
app.use('/posts', postRoute); // ✅ Đổi /users -> /posts để tránh xung đột
app.use('/users', userRoute);
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute);
app.use('/schedules', scheduleRoute);
app.use('/chats', chatbotRoute);
app.use('/documents', documentRoute);
app.use('/inquiry', inquiryRoute);
app.use('/admin/auth', adminAuthRoute);
app.use('/admin', adminDashboardRoute);
app.use('/admin/posts', adminPostRoute);

// ✅ API lấy danh ngôn ngẫu nhiên
app.get('/quotations/random', async (req, res) => {
    try {
        const count = await Quotation.countDocuments();
        if (count === 0) {
            return res.status(404).json({ message: "Không có danh ngôn nào!" });
        }
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuote = await Quotation.findOne().skip(randomIndex);
        res.json(randomQuote);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh ngôn", error });
    }
});

// ✅ Kiểm tra Swagger YAML trước khi load
const swaggerPath = './API/swagger.yaml';
if (fs.existsSync(swaggerPath)) {
    const swaggerDocument = YAML.load(swaggerPath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
    console.warn('⚠️ File swagger.yaml không tồn tại, API Docs sẽ không hoạt động.');
}

// ✅ Middleware xử lý lỗi nên đặt cuối cùng
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Lỗi server", error: err.message });
});

// ✅ Khởi động server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📜 API Docs available at http://localhost:${PORT}/api-docs`);
});
