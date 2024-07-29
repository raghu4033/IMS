const { Schema, model } = require("mongoose");

const classScheduleSchema = new Schema(
  {
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: String,
      ref: "Course",
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    classType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ClassSchedule", classScheduleSchema);
