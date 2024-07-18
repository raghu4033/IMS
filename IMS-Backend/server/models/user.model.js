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
    cast: { type: String, default: "" },
    nationality: { type: String },
    permanentAddress: { type: String },
    presentAddress: { type: String },
    city: { type: String },
    pin: { type: String },
    mobile: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: String },
    academicYear: { type: String },
    sid: { type: String },
    bloodGroup: { type: String },
    totalFees: { type: Number },
    remainingFees: { type: Number },
    salary: { type: Number },
    joiningDate: { type: Date },
    parentsName: { type: String },
    parentsMobile: { type: String },
    batchName: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    bankName: { type: String },
    accountName: { type: String },
    ifscCode: { type: String },
    accountNumber: { type: String },
    department: { type: String },
    yearOfExperience: { type: Number },
    qualification: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
