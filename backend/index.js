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
const userRoute = require('./routes/userRoute');
const passport = require('./controllers/googleController');

const YAML = require('yamljs');

const swaggerDocument = YAML.load('./API/swagger.yaml');

const app = express();
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin:process.env.FRONTEND_URL,
    credentials:true,
}
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



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`📜 API Docs available at http://localhost:${PORT}/api-docs`);
    });