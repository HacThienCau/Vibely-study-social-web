// Middleware giúp xác thực người dùng trước khi họ truy cập vào các API yêu cầu đăng nhập. 
const jwt = require('jsonwebtoken');
const response = require('../utils/responseHandler');


const  authMiddleware = (req,res,next) =>{
    const authToken = req?.cookies?.auth_token;
    if(!authToken) return response(res,401, 'Bạn cần đăng nhập để thực hiện thao tác này');

    try {
         const decode = jwt.verify(authToken,process.env.JWT_SECRET);
         req.user = decode;
         next();
    } catch (error) {
        console.error(error)
        return response(res,401, 'Token không hợp lệ');
    }
}

module.exports = authMiddleware;