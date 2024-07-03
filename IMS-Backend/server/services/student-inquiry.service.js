const mongoose = require('mongoose');
const { BadRequestError } = require('../utils/error');
const { objectId } = require('../utils/mongo');

const { 'Student-Inquiry': StudentInquiry } = mongoose.models;

async function getStudentInquiries() {
  try {
    const courses = await StudentInquiry.find(
      {},
      {},
      {
        sort: {
          updatedAt: -1,
        },
      }
    ).populate('course');

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
      dob,
      qualification,
      gender,
      reference,
      course,
    } = body;

    const existingInquiry = await StudentInquiry.findOne({ email });

    if (existingInquiry?._id) {
      throw new BadRequestError('Inquiry exists with given email.');
    }

    const inquiryData = await StudentInquiry.create({
      fullName,
      email,
      mobile,
      whatsapp,
      joiningDate,
      dob,
      qualification,
      gender,
      reference,
      course: objectId(course),
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
