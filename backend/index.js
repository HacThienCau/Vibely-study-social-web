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
const adminPostRoute = require('./routes/adminPostRoute')

const YAML = require('yamljs');

const swaggerDocument = YAML.load('./API/swagger.yaml');

const app = express();
app.use(express.json());

// Add basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
const session = require('express-session');
app.use(cors(corsOptions));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: isProduction,   // ✅ Chỉ bật secure nếu chạy trên Render (HTTPS)
            sameSite: isProduction ? "none" : "lax", // ✅ Tránh lỗi CORS trên local
            httpOnly: true
        }
    })
);
app.use(cookieParser());

// Add a basic root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001", "https://vibely-study-social-web.onrender.com"],
    credentials: true,
};

app.set("trust proxy", 1); // 🔥 Bật proxy để Express hiểu request từ frontend

connectDb();
app.use(passport.initialize())

//API Route
app.use('/auth', authRoute);
app.use('/users', postRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute);
app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('/chats', chatbotRoute);
app.use("/documents", documentRoute);
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`📜 API Docs available at http://localhost:${PORT}/api-docs`);
});