const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;
