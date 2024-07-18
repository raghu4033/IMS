const mongoose = require("mongoose");
const { Constants } = require("../utils/constants");
const moment = require("moment");
const { Fees, User } = mongoose.models;

async function getFees(filters) {
  try {
    const { query = {} } = filters;
    const { student } = query;
    const filterQuery = {};
    if (student) {
      filterQuery.student = student;
    }
    const fees = await Fees.find(
      filterQuery,
      {},
      { sort: { createdAt: -1 } }
    ).populate(
      "student",
      "firstName lastName middleName remainingFees totalFees"
    );

    let studentData = {};
    if (student) {
      studentData = await User.findOne(
        { _id: student },
        {
          firstName: 1,
          middleName: 1,
          lastName: 1,
          remainingFees: 1,
          totalFees: 1,
        }
      );
    }

    return fees.length ? fees : student ? [{ student: studentData }] : [];
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createFeeInstallment(body) {
  try {
    const { paymentDate, feesAmount, student, installmentNumber, paymentType } =
      body;

    const studentDetails = await User.findOne(
      {
        _id: student,
        role: Constants.Role.STUDENT,
      },
      {
        totalFees: 1,
        remainingFees: 1,
      }
    );

    if (!studentDetails?._id) {
      throw new BadRequestError("Student not exist");
    }

    const currentTimeStamp = moment().format("yyyyMMDD");
    const randomString = Math.floor(
      1000000 + Math.random() * 9000000
    ).toString();

    console.log(currentTimeStamp + randomString);

    console.log({
      receiptNo: currentTimeStamp + randomString,
      paymentDate,
      feesAmount,
      student,
      installmentNumber,
      paymentType,
    });

    const feesData = await Fees.create({
      receiptNo: currentTimeStamp + randomString,
      paymentDate,
      feesAmount,
      student,
      installmentNumber,
      paymentType,
    });

    console.log("Hello");

    if (studentDetails?._id && studentDetails?.totalFees) {
      const remainingFees = Math.max(
        studentDetails.remainingFees - feesAmount,
        0
      );
      await User.findOneAndUpdate({ _id: student }, { remainingFees });
    }

    return feesData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getFees,
  createFeeInstallment,
};
