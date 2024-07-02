const { Schema, model } = require("mongoose");


const User = require("./user.model");

const announcementSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true
    },
    notice_for: {
      type: String,
      default: 'all',
      maxlength: 200
    },
    notice_sub: {
      type: String,
      required: true,
      maxlength: 100
    },
    notice_date: {
      type: Date,
      required: true
    },
    notice_desc: {
      type: String,
      required: true
    },
    notice_file: {
      type: String, 
      required: false 
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = model("Announcement", announcementSchema);
