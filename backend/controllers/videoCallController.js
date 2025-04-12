const VideoCall = require('../model/VideoCall');

exports.createCall = async (req, res) => {
    try {
        console.log('Received create call request:', req.body);

        const { callerId, receiverId, roomId } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!callerId || !receiverId || !roomId) {
            return res.status(400).json({
                error: 'Missing required fields',
                received: { callerId, receiverId, roomId }
            });
        }

        // Lưu thông tin cuộc gọi vào database
        const videoCall = new VideoCall({
            roomId,
            callerId,
            receiverId,
            status: 'pending',
            startTime: new Date()
        });

        await videoCall.save();
        console.log('Video call saved to database:', videoCall);

        // Gửi thông báo đến người nhận qua socket
        req.io.to(receiverId).emit('incoming-call', {
            roomId,
            callerId,
            callerName: req.user.username
        });

        res.json({ roomId });
    } catch (error) {
        console.error('Error in createCall:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.acceptCall = async (req, res) => {
    try {
        const { roomId } = req.body;

        // Lấy thông tin cuộc gọi
        const videoCall = await VideoCall.findOne({ roomId });
        if (!videoCall) {
            return res.status(404).json({ error: 'Cuộc gọi không tồn tại' });
        }

        // Cập nhật trạng thái cuộc gọi
        await VideoCall.findOneAndUpdate(
            { roomId },
            { status: 'accepted' }
        );

        // Gửi thông báo đến người gọi
        req.io.to(videoCall.callerId).emit('call-accepted', { roomId });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.endCall = async (req, res) => {
    try {
        const { roomId } = req.body;

        // Lấy thông tin cuộc gọi
        const videoCall = await VideoCall.findOne({ roomId });
        if (!videoCall) {
            return res.status(404).json({ error: 'Cuộc gọi không tồn tại' });
        }

        // Cập nhật trạng thái cuộc gọi
        await VideoCall.findOneAndUpdate(
            { roomId },
            {
                status: 'ended',
                endTime: new Date()
            }
        );

        // Gửi thông báo đến cả 2 người
        req.io.to(roomId).emit('call-ended');

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rejectCall = async (req, res) => {
    try {
        const { roomId } = req.body;

        // Lấy thông tin cuộc gọi
        const videoCall = await VideoCall.findOne({ roomId });
        if (!videoCall) {
            return res.status(404).json({ error: 'Cuộc gọi không tồn tại' });
        }

        // Cập nhật trạng thái cuộc gọi
        await VideoCall.findOneAndUpdate(
            { roomId },
            {
                status: 'rejected',
                endTime: new Date()
            }
        );

        // Gửi thông báo đến người gọi
        req.io.to(videoCall.callerId).emit('call-rejected', { roomId });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};