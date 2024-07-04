const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    place: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
