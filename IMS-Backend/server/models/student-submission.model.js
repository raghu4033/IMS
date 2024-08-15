const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    submission: {
      type: Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Student-Submission", schema);
