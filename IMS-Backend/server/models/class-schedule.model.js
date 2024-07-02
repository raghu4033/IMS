const { Schema, model } = require("mongoose");

const User = require("./user.model");
const Course = require("./course.model");

const classScheduleSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true
    },
    course: {
      type: String,
      ref: "Course",
      required: true
    },
    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
      required: true
    },
    fromTime: {
      type: String,
      required: true
    },
    toTime: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    classType: {
      type: String,
      required: true
    },
    faculty: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    maxStudents: {
      type: Number,
      required: true
    },
    recurring: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model("ClassSchedule", classScheduleSchema);
