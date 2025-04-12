const io = require('../../socket');

module.exports = (req, res, next) => {
    req.io = io;
    next();
};