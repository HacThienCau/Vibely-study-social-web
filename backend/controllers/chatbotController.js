const Chatbot = require('../model/Chatbot');
const UserChatbot = require('../model/UserChatbot');

// Tạo hội thoại mới
const createChat = async (req, res) => {
    const userId = req.user.userId;
    const { text, answer } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "Bạn cần đăng nhập" });
    }

    if (!text) {
        return res.status(400).json({ message: "Bạn cần nhập nội dung câu hỏi" });
    }

    try {
        // Tạo hội thoại mới
        const newChat = new Chatbot({
            user: userId,
            history: [
                {
                    role: 'user',
                    parts: [{ text }],
                },
                {
                    role: 'model',
                    parts: [{ text: answer }],
                },
            ],
        });

        // Lưu hội thoại
        const savedChat = await newChat.save();
        // Kiểm tra nếu bản ghi userChatbot đã tồn tại
        const userChatbot = await UserChatbot.findOne({ user: userId });

        if (!userChatbot) {
            const newUserChatbot = new UserChatbot({
                user: userId,
                chats: [
                    {
                        _id: savedChat._id,
                        title: text.substring(0, 40),
                    }
                ]
            });
            await newUserChatbot.save();
        }
        else {
            await UserChatbot.updateOne(
                { user: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 40),
                        }
                    }
                }
            );
        }

        return res.status(201).json(savedChat);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách hội thoại
const getChats = async (req, res) => {
    const userId = req.user.userId;

    try {
        const userChatbot = await UserChatbot.findOne({ user: userId });
        console.log(userChatbot);
        if (!userChatbot || !userChatbot.chats || userChatbot.chats.length === 0) {
            return res.status(200).json({ message: "Không có hội thoại nào" });
        }
        res.status(200).send(userChatbot.chats);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách hội thoại: ", error);
        res.status(500).send("Lỗi khi lấy danh sách hội thoại");
    }

};

// Lấy hội thoại theo id
const getChatItem = async (req, res) => {
    const userId = req.user.userId;
    console.log(userId);
    console.log(req.params.chatId);
    try {
        const chat = await Chatbot.findOne({ _id: req.params.chatId, user: userId });
        console.log(chat);
        res.status(200).send(chat);
    }
    catch (error) {
        console.log("Lỗi khi lấy hội thoại: ", error);
        res.status(500).send("Lỗi khi lấy hội thoại");
    }
}

// Gửi câu hỏi mới vào hội thoại
const putQuestion = async (req, res) => {
    const userId = req.user.userId;
    console.log(req.body);
    const { question, answer, img } = req.body;

    const newItems = [
        ...(question
            ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
            : []),
        { role: "model", parts: [{ text: answer }] },
    ];

    try {
        const updatedChat = await Chatbỉ.updateOne(
            { _id: req.params.chatId, user: userId },
            {
                $push: {
                    history: {
                        $each: newItems,
                    },
                },
            }
        );
        res.status(200).send(updatedChat);
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi khi gửi câu hỏi");
    }
}

module.exports = { createChat, getChats, getChatItem, putQuestion };