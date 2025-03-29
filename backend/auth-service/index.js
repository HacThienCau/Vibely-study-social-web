const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require('./config/db');
require('dotenv').config();

// Import routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const forgotPasswordRoute = require('./routes/forgotPassword');
const passport = require('./controllers/googleController');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./API/swagger.yaml');

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both user & admin frontends
    credentials: true,
};

app.use(cors(corsOptions));

// Connect to database
connectDb();

// Initialize passport for Google OAuth
app.use(passport.initialize());

// API Routes
app.use('/auth', authRoute);           // Authentication routes
app.use('/users', userRoute);          // User management routes
app.use('/forgot-password', forgotPasswordRoute);  // Password recovery

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'User Service' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

const PORT = process.env.USER_SERVICE_PORT || 8082;
app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
    console.log(`📜 User API Docs available at http://localhost:${PORT}/api-docs`);
});