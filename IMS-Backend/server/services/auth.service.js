const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../utils/error");
const { Configs } = require("../utils/config");

const { User } = mongoose.models;

async function login(body) {
  try {
    const { emailOrSid, password } = body;
    const userData = await User.findOne({
      $or: [{ email: emailOrSid }, { sid: emailOrSid }],
    });

    if (!userData?._id) {
      throw new NotFoundError("User not found.");
    }

    const isMatchPassword = bcrypt.compareSync(password, userData.password);

    if (!isMatchPassword) {
      throw new NotFoundError("Invalid credentials");
    }

    const payload = {
      _id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      mobile: userData.mobile,
      role: userData.role,
    };

    const token = jwt.sign(payload, Configs.JWT_SECRET, {
      expiresIn: "3h",
    });

    return { token, payload };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  login,
};
