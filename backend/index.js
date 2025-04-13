const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
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
const adminUserRoute = require('./routes/adminUserRoute')
const adminInformationRoute = require('./routes/adminInformationRoute');
const forgotPasswordRoute = require('./routes/forgotPassword');
const quizRoute = require('./routes/quizRoute');
const YAML = require('yamljs');
const createDefaultAdmin = require('./utils/createDefaultAdmin');

const swaggerDocument = YAML.load(path.join(__dirname, 'API/swagger.yaml'));

const options = {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true
    }
};

const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001",
        "http://localhost:3002", "http://localhost:3003",
        "https://vibely-study-social-web.onrender.com"],
    credentials: true,
};


app.use(cors(corsOptions));


connectDb().then(() => {
    // Tạo admin mặc định sau khi kết nối database thành công
    createDefaultAdmin();
});
app.use(passport.initialize())
//API Route
app.use('/auth', authRoute);
app.use('/users', postRoute);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, options));
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute);
app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('/chats', chatbotRoute);
app.use("/documents", documentRoute);
app.use('/inquiry', inquiryRoute);
app.use('/quizzes', quizRoute);
app.use('/admin/auth', adminAuthRoute);
app.use('/admin', adminDashboardRoute);
app.use('/admin', adminInformationRoute);
app.use('/admin/posts', adminPostRoute);
app.use('/admin/users', adminUserRoute);
app.use('/forgot-password', forgotPasswordRoute);

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`📜 API Docs available at http://localhost:${PORT}/api-docs`);
});

/*    //FOR TEST API - chỉ mở đoạn này và cmt các đoạn trên nếu test API
module.exports = (async () => {
    await connectDb(); // Chờ kết nối DB xong
    return app;
})();
*/
