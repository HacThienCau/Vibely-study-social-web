const Conversation = require('../model/Conversation');

// Tạo cuộc trò chuyện mới
const createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Thiếu senderId hoặc receiverId" });
        }

        const newConversation = new Conversation({
            members: [senderId, receiverId],
        });

        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (err) {
        console.error("Lỗi khi tạo cuộc trò chuyện:", err);
        return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

// Lấy danh sách cuộc trò chuyện của một người dùng
const getUserConversations = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: "Thiếu userId" });
        }

        const conversations = await Conversation.find({
            members: { $in: [userId] },
        });

        return res.status(200).json(conversations);
    } catch (err) {
        console.error("Lỗi khi lấy danh sách cuộc trò chuyện:", err);
        return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

// Lấy cuộc trò chuyện giữa hai người dùng
const getConversationBetweenUsers = async (req, res) => {
    try {
        const { firstUserId, secondUserId } = req.params;

        if (!firstUserId || !secondUserId) {
            return res.status(400).json({ message: "Thiếu userId" });
        }

        const conversation = await Conversation.findOne({
            members: { $all: [firstUserId, secondUserId] },
        });

        return res.status(200).json(conversation);
    } catch (err) {
        console.error("Lỗi khi lấy cuộc trò chuyện giữa hai người dùng:", err);
        return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};

module.exports = { createConversation, getUserConversations, getConversationBetweenUsers };
