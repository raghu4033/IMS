const { Schema, model } = require("mongoose");

const User = require("./user.model");

const eventSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true
    },
    event_name: {
      type: String,
      required: true,
      maxlength: 100
    },
    event_place: {
      type: String,
      default: ''
    },
    event_date: {
      type: Date,
      required: true
    },
    event_time: {
      type: String,
      required: true
    },
    event_description: {
      type: String,
      required: false,
      maxlength: 500
    },
    event_type: {
      type: String,
      required: false
    },
    participants: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
