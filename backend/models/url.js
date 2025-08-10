const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    original_URL: {
      type: String,
      required: true,
    },
    short_code: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("url", urlSchema);
