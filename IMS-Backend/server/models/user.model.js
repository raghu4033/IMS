const { Schema, model } = require("mongoose");
const { Constants } = require("../utils/constants");

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Constants.Role),
      default: Constants.Role.STUDENT,
    },
    dob: { type: Date },
    gender: { type: String, default: "" },
    aadhar: { type: String },
    address: { type: String },
    city: { type: String },
    pin: { type: String },
    mobile: { type: String },
    photo: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: String },
    academicYear: { type: String },
    sid: { type: String },
    bloodGroup: { type: String },
    college: { type: String },
    qualification: { type: String },
    fees: { type: Number },
    remainingFees: { type: Number },
    joiningDate: { type: Date },
    departmentCategory: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
