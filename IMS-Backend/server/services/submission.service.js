const mongoose = require("mongoose");
const { Constants } = require("../utils/constants");
const { Submission } = mongoose.models;

async function getSubmissions(reqUser) {
  try {
    const filters = {};;
    if (reqUser?.role === Constants.Role.STUDENT) {
      filters.fromDate = {
        $lte: Date.now(),
      };
      filters.toDate = {
        $gte: Date.now(),
      };
    } else if (reqUser?.role === Constants.Role.FACULTY) {
      filters.createdBy = reqUser?._id;
    }

    const submissions = await Submission.find(
      { ...filters },
      {},
      { sort: { fromDate: -1 } }
    ).populate("createdBy", "firstName lastName middleName mobile");

    return submissions;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createSubmission(body, reqUser) {
  try {
    const { title, description, fromDate, toDate } = body;

    const submissionData = await Submission.create({
      title,
      description,
      fromDate,
      toDate,
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
