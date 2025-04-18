const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        badge_name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        achieved_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Achievement", achievementSchema); 