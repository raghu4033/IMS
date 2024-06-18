const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/error");

const { "Student-Inquiry": StudentInquiry } = mongoose.models;

async function getStudentInquiries() {
  try {
    const courses = await StudentInquiry.find({});

    return courses;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createStudentInquiry(body) {
  try {
    const {
      fullName,
      email,
      mobile,
      whatsapp,
      joiningDate,
      dov,
      qualification,
      gender,
      reference,
      course,
    } = body;

    const existingInquiry = await Course.findOne({ email });

    if (existingInquiry?._id) {
      throw new BadRequestError("Inquiry exists with given email.");
    }

    const inquiryData = await StudentInquiry.create({
      fullName,
      email,
      mobile,
      whatsapp,
      joiningDate,
      dov,
      qualification,
      gender,
      reference,
      course,
    });

    return inquiryData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getStudentInquiries,
  createStudentInquiry,
};
