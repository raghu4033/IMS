const mongoose = require("mongoose");

const { Course } = mongoose.models;

async function getCourses() {
  try {
    const courses = await Course.find({});

    return courses;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getCourses,
};
