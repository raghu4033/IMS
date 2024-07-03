const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BadRequestError } = require('../utils/error');
const moment = require('moment/moment');

const { User } = mongoose.models;

async function getUsers() {
  try {
    const users = await User.find({});

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
      throw new BadRequestError('User already exists with give email.');
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const userData = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      mobile,
      password: hashPassword,
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
      password,
    } = body;

    const existUsers = await User.findOne({ email });

    if (existUsers?._id) {
      throw new BadRequestError('User already exists with give email.');
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const currentTimeStamp = moment().format('yyyyMMDD');
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
      password: hashPassword,
    });

    return userData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getUsers,
  createAdminUser,
};