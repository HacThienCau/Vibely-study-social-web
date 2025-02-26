const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ['image', 'video'] },
    
    reactions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
            type: { 
                type: String, 
                enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], 
                default: 'like' 
            },
            createdAt: { type: Date, default: Date.now } 
        }
    ],

    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },

            reactions: [
                {
                    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    type: { 
                        type: String, 
                        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], 
                        default: 'like' 
                    },
                    createdAt: { type: Date, default: Date.now } 
                }
            ],

            replies: [
                {
                    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    text: { type: String, required: true },
                    createdAt: { type: Date, default: Date.now }
                }
            ]
        }
    ],

    reactionCount: { type: Number, default: 0 }, 
    commentCount: { type: Number, default: 0 }, 
    share: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shareCount: { type: Number, default: 0 }

}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
