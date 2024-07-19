const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/error");
const { Constants } = require("../utils/constants");
const { Attendance } = mongoose.models;

async function getAttendances(reqUser) {
  try {
    const filters = {}
    console.log(reqUser)
    if (reqUser?.role === Constants.Role.STUDENT) {
      filters.student = reqUser?._id
    } else if (reqUser?.role === Constants.Role.FACULTY) {
      filters.faculty = reqUser?._id
    }

    console.log(filters)

    const attendances = await Attendance.find(
      { ...filters },
      {},
      { sort: { date: -1 } }
    )
      .populate("faculty student", "sid firstName lastName middleName mobile")
      .populate("course", "name");

    return attendances;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createAttendance(body, reqUser) {
  try {
    const { course, date, students } = body;

    const isAttendanceTaken = await Attendance.exists({ course, date, faculty: reqUser });

    if (isAttendanceTaken) {
      throw new BadRequestError("Attendance is already taken for this course by this faculty.");
    }

    const insertData = students.map((s) => {
      return { faculty: reqUser, student: s._id, date, isPresent: s?.isPresent || false, course }
    })


    const attendanceData = await Attendance.insertMany(insertData);

    return attendanceData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getAttendances,
  createAttendance,
};
