const mongoose = require("mongoose");

const learningTreeSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tree_type: {
            type: String,
            required: true,
        },
        growth_stage: {
            type: Number,
            default: 0,
            min: 0,
            max: 3,
        },
        height_cm: {
            type: Number,
            default: 0,
            min: 0,
        },
        last_updated: {
            type: Date,
            default: Date.now,
        },
        is_withered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("LearningTree", learningTreeSchema); 