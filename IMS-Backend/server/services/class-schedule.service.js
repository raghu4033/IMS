const mongoose = require("mongoose");
const { Constants } = require("../utils/constants");
const { ClassSchedule, User, Course } = mongoose.models;

async function getClassSchedules(user, filters) {
  try {
    console.log(user);
    const { query = {} } = filters;
    const { faculty } = query;
    const filterQuery = {};

    if (user?.role === Constants.Role.STUDENT) {
      filterQuery.course = user?.course;
    }
    if (faculty) {
      filterQuery.faculty = faculty;
    }
    const classSchedules = await ClassSchedule.find(
      filterQuery,
      {},
      { sort: { createdAt: -1 } }
    )
      .populate("faculty", "firstName lastName middleName")
      .populate("course");

    return classSchedules;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createClassSchedule(body) {
  try {
    const { course, faculty, fromDate, toDate, classType, subject } = body;

    const isFacultyExists = await User.exists({
      _id: faculty,
      role: Constants.Role.FACULTY,
    });

    if (!isFacultyExists) {
      throw new BadRequestError("Faculty not exist");
    }

    const isCourseExists = await Course.exists({
      _id: course,
    });

    if (!isCourseExists) {
      throw new BadRequestError("Course not exist");
    }

    const classData = await ClassSchedule.create({
      course,
      faculty,
      fromDate,
      toDate,
      classType,
      subject,
    });

    return classData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getClassSchedules,
  createClassSchedule,
};
