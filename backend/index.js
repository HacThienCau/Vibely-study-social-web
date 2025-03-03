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

const YAML = require('yamljs');

const swaggerDocument = YAML.load('./API/swagger.yaml');

const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // URL frontend
    credentials: true,
};

app.use(cors(corsOptions));



connectDb();
app.use(passport.initialize())

//API Route
app.use('/auth', authRoute);
app.use('/users', postRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute);
app.use('/users', userRoute);
app.use('/', scheduleRoute);

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


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`📜 API Docs available at http://localhost:${PORT}/api-docs`);
    });