const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/error");
const { Constants } = require("../utils/constants");
const { Certificate } = mongoose.models;

async function getCertificates(reqUser) {
  try {
    const filters = {}
    console.log(reqUser)
    if (reqUser?.role === Constants.Role.STUDENT) {
      filters.student = reqUser?._id
    }

    const attendances = await Certificate.find(
      { ...filters },
      {},
      { sort: { date: -1 } }
    )
      .populate("student", "sid firstName lastName middleName mobile course")
      .populate("generatedBy", "firstName lastName middleName")
      .populate("course", "name");

    return attendances;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createCertificate(body, reqUser) {
  try {
    const { certificateGrade, date, student, course } = body;

    const isCertificateTaken = await Certificate.exists({ date, student: reqUser?._id, course });

    if (isCertificateTaken) {
      throw new BadRequestError("Certificate is already generate for same date");
    }

    const attendanceData = await Certificate.create({ generatedBy: reqUser?._id, student, date, certificateGrade, course });

    return attendanceData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getCertificates,
  createCertificate,
};
