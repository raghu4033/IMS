const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../utils/error");

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
      throw new BadRequestError("User already exists with give email.")
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

module.exports = {
  getUsers,
  createAdminUser,
};
