const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        nicknames: {
            type: Map,
            of: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);