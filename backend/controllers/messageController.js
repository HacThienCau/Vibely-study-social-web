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

// Đánh dấu tin nhắn đã đọc
const markMessageAsRead = async (req, res) => {
    try {
        const { messageId, userId } = req.body;
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
        }

        if (!message.readBy.includes(userId)) {
            message.readBy.push(userId);
            if (message.readBy.length === 2) { // Nếu cả 2 người đã đọc
                message.isRead = true;
            }
            await message.save();
        }

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Lấy số tin nhắn chưa đọc của một người dùng
const getUnreadMessageCount = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            readBy: { $nin: [userId] },
            sender: { $ne: userId } // Không đếm tin nhắn do chính user gửi
        });

        // Nhóm số tin nhắn chưa đọc theo conversationId
        const unreadCounts = messages.reduce((acc, message) => {
            if (!acc[message.conversationId]) {
                acc[message.conversationId] = 0;
            }
            acc[message.conversationId]++;
            return acc;
        }, {});

        const totalUnread = messages.length;

        res.status(200).json({
            total: totalUnread,
            byConversation: unreadCounts
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Lấy tin nhắn cuối cùng của mỗi cuộc trò chuyện
const getLastMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await Message.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: "$conversationId",
                    lastMessage: { $first: "$$ROOT" }
                }
            }
        ]);

        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    addMessage,
    getMessagesByConversationId,
    markMessageAsRead,
    getUnreadMessageCount,
    getLastMessages
};