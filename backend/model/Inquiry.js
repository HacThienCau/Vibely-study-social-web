const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;
