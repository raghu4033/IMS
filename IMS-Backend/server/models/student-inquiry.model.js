const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    dob: { type: Date, required: true },
    qualification: { type: String, required: true },
    gender: { type: String, default: "" },
    reference: { type: String, default: "N/A" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Student-Inquiry", schema);
