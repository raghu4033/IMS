const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../utils/error");
const moment = require("moment/moment");
const { Constants } = require("../utils/constants");
const { sendMail } = require("../utils/nodemailer");

const {
  User,
  Fees,
  Event,
  "Student-Inquiry": StudentInquiry,
  ClassSchedule,
  Announcement,
} = mongoose.models;

async function getUsers({ query }) {
  try {
    const { role, course } = query;
    const filters = {};

    if (role) filters.role = role;
    if (course) filters.course = course;
    const users = await User.find(
      filters,
      { password: 0 },
      { sort: { updatedAt: -1 } }
    ).populate("course");

    return users;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createAdminUser(body) {
  try {
    const { firstName, middleName, lastName, email, mobile, password } = body;

    const existUsers = await User.findOne({ email });

    if (existUsers?._id) {
      throw new BadRequestError("User already exists with give email.");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const userData = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      mobile,
      password: hashPassword,
      role: Constants.Role.ADMIN,
    });

    return userData;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createStudentUser(body) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      dob,
      gender,
      aadhar,
      address,
      city,
      pin,
      mobile,
      academicYear,
      bloodGroup,
      college,
      qualification,
      joiningDate,
      nationality,
      cast,
      permanentAddress,
      presentAddress,
      parentsName,
      parentsMobile,
      totalFees,
      batchName,
      course,
      profileImage,
    } = body;

    const existUsers = await User.findOne({ email });

    if (existUsers?._id) {
      throw new BadRequestError("User already exists with give email.");
    }
    const password = "Student";
    const hashPassword = bcrypt.hashSync(password, 10);

    const currentTimeStamp = moment().format("yyyyMMDD");
    const randomString = Math.floor(
      1000000 + Math.random() * 9000000
    ).toString();

    const userData = await User.create({
      sid: currentTimeStamp + randomString,
      firstName,
      middleName,
      lastName,
      email,
      dob,
      gender,
      aadhar,
      address,
      city,
      pin,
      mobile,
      academicYear,
      bloodGroup,
      college,
      qualification,
      joiningDate,
      password: hashPassword,
      role: Constants.Role.STUDENT,
      joiningDate,
      nationality,
      cast,
      permanentAddress,
      presentAddress,
      parentsName,
      parentsMobile,
      totalFees,
      remainingFees: totalFees,
      batchName,
      course,
      profileImage,
    });

    sendMail({
      to: email,
      subject: "IMS Credentials",
      text: `Email: ${email}, Password: ${password}`,
    });

    return userData;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createFacultyUser(body) {
  try {
    const {
      department,
      yearOfExperience,
      joiningDate,
      qualification,
      salary,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      nationality,
      bloodGroup,
      cast,
      permanentAddress,
      presentAddress,
      city,
      pin,
      mobile,
      email,
      bankName,
      accountName,
      ifscCode,
      accountNumber,
      profileImage,
    } = body;

    const existUsers = await User.findOne({ email });

    if (existUsers?._id) {
      throw new BadRequestError("User already exists with give email.");
    }

    const password = "Faculty";
    const hashPassword = bcrypt.hashSync(password, 10);

    const userData = await User.create({
      department,
      yearOfExperience,
      joiningDate,
      qualification,
      salary,
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      nationality,
      bloodGroup,
      cast,
      permanentAddress,
      presentAddress,
      city,
      pin,
      mobile,
      email,
      bankName,
      accountName,
      ifscCode,
      accountNumber,
      password: hashPassword,
      role: Constants.Role.FACULTY,
      profileImage,
    });

    sendMail({
      to: email,
      subject: "IMS Credentials",
      text: `Email: ${email}, Password: ${password}`,
    });

    return userData;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getDashboardSummary(reqUser) {
  try {
    if (
      ![Constants.Role.ADMIN, Constants.Role.FACULTY].includes(
        reqUser?.role || ""
      )
    ) {
      throw new BadRequestError(
        "You are not authorised to access this resource."
      );
    }

    let totalStudents = 0;
    let totalFaculties = 0;
    let totalFees = 0;
    let totalEvents = 0;
    let latest2ClassSchedule = [];
    let latest2Announcements = [];
    let latest5Students = [];

    if (reqUser?.role === Constants.Role.ADMIN) {
      totalStudents = await User.countDocuments({
        role: Constants.Role.STUDENT,
      });

      totalFaculties = await User.countDocuments({
        role: Constants.Role.FACULTY,
      });

      totalFees = await Fees.aggregate().group({
        _id: null,
        total: {
          $sum: "$feesAmount",
        },
      });

      totalEvents = await Event.countDocuments({});

      latest2ClassSchedule = await ClassSchedule.find(
        {},
        {
          fromDate: 1,
          course: 1,
        },
        { sort: { fromDate: -1 }, limit: 2 }
      ).populate("course", "name");
    }

    if (reqUser?.role === Constants.Role.FACULTY) {
      latest2Announcements = await Announcement.find(
        {},
        {
          subject: 1,
          date: 1,
        },
        { sort: { date: -1 }, limit: 2 }
      );
      latest5Students = await await User.find(
        {
          role: Constants.Role.STUDENT,
        },
        { firstName: 1, lastName: 1, sid: 1 },
        { sort: { createdAt: -1 }, limit: 5 }
      );
    }

    const latest2Inquiry = await StudentInquiry.find(
      {},
      {
        name: 1,
        createdAt: 1,
        joiningDate: 1,
        fullName: 1,
        email: 1,
        mobile: 1,
      },
      { sort: { createdAt: -1 }, limit: 2 }
    );

    const latest2Event = await Event.find(
      {},
      {
        name: 1,
        date: 1,
      },
      { sort: { date: -1 }, limit: 2 }
    );

    return {
      totalStudents,
      totalFaculties,
      totalFees: totalFees?.[0]?.total ?? 0,
      totalEvents,
      latest2Inquiry,
      latest2Event,
      latest2ClassSchedule,
      latest2Announcements,
      latest5Students,
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getUsers,
  createAdminUser,
  createStudentUser,
  createFacultyUser,
  getDashboardSummary,
};
