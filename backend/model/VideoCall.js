// backend/models/VideoCall.js
const mongoose = require('mongoose');

const videoCallSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    callerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'ended'],
        default: 'pending'
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('VideoCall', videoCallSchema);