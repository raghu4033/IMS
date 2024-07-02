const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true
    },
    notice_for: {
      type: String,
      default: 'all'
    },
    notice_sub: {
      type: String,
      required: true
    },
    notice_date: {
      type: Date,
      required: true
    },
    notice_priority: {
      type: String,
      default: 'normal'
    },
    notice_type: {
      type: String,
      default: 'general'
    },
    notice_tags: {
      type: [String],
      default: []
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = model("Announcement", announcementSchema);
