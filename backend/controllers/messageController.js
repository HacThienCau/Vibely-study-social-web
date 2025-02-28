const Message = require('../model/Message');

// Thêm tin nhắn mới
const addMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Lấy tin nhắn theo conversationId
const getMessagesByConversationId = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { addMessage, getMessagesByConversationId };