const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/error");
const { Constants } = require("../utils/constants");
const { "Student-Submission": StudentSubmission, Submission } = mongoose.models;

async function getSubmissions(reqUser, query) {
  try {
    const filters = {};
    if (reqUser?.role === Constants.Role.STUDENT) {
      filters.createdBy = reqUser?._id;
    } else if (reqUser?.role === Constants.Role.FACULTY) {
      filters.faculty = reqUser?._id;
    }
    if (query?.submission) {
      filters.submission = query.submission;
    }

    const submissions = await StudentSubmission.find(
      { ...filters },
      {},
      { sort: { fromDate: -1 } }
    )
      .populate("createdBy faculty", "firstName lastName middleName mobile")
      .populate("submission", "title");

    return submissions;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createSubmission(body, reqUser) {
  try {
    const { fileUrl, description, submission } = body;

    const submissionDetails = await Submission.findById(submission);

    if (!submissionDetails?._id) {
      throw new BadRequestError("Submission not exists.");
    }

    const submissionData = await StudentSubmission.create({
      fileUrl,
      description,
      submission,
      submittedAt: Date.now(),
      faculty: submissionDetails?.createdBy,
      createdBy: reqUser?._id,
    });

    return submissionData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getSubmissions,
  createSubmission,
};
