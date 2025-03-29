const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connect } = require('mongoose');
const connectDb = require('./src/config/db');
require('dotenv').config();
const adminAuthRoute = require('./src/routes/adminAuthRoute');
const adminDashboardRoute = require('./src/routes/adminDashboardRoute');
const adminPostRoute = require('./src/routes/adminPostRoute');
const adminUserRoute = require('./src/routes/adminUserRoute');
const adminInformationRoute = require('./src/routes/adminInformationRoute');

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
};

app.use(cors(corsOptions));

connectDb();

// Admin API Routes
app.use('/admin/auth', adminAuthRoute);
app.use('/admin', adminDashboardRoute);
app.use('/admin', adminInformationRoute);
app.use('/admin/posts', adminPostRoute);
app.use('/admin/users', adminUserRoute);


const PORT = process.env.ADMIN_SERVICE_PORT || 8081;
app.listen(PORT, () => {
    console.log(`Admin Service is running on port ${PORT}`);
});