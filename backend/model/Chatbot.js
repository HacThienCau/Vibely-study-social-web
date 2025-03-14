const mongoose = require('mongoose');

//Schema lưu lại lịch sử hội thoại giữa người dùng và chatbot
const ChatbotSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    history: [
        {
            role: {
                type: String,
                enum: ['user', 'model'],
                required: true,
            },
            parts: [
                {
                    text: {
                        type: String,
                        required: true,
                    }
                }
            ],
            img: {
                type: String,
                required: false,
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Chatbot', ChatbotSchema);