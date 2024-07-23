const { default: mongoose } = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../utils/error");
const { Configs } = require("../utils/config");
const { sendMail } = require("../utils/nodemailer");
const { generateOTP } = require("../utils/functions");

const { User, Otp } = mongoose.models;

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

async function sendOTPForgotPassword(body) {
  try {
    const { email } = body;
    const userData = await User.findOne({
      email,
    });

    if (!userData?._id) {
      throw new NotFoundError("User not found.");
    }

    const otp = generateOTP()
    await sendMail({
      to: `${[userData?.firstName, userData.lastName].filter(Boolean).join(" ")} <${userData?.email}>`,
      subject: "Verification code for Forgot Password",
      text: `Verification Code: ${otp}`
    })

    const expiresIn = moment().add(10, 'minutes').valueOf();
    console.log(otp, expiresIn);
    await Otp.create({
      otp,
      email,
      expiresIn
    });

    return true;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function verifyOTPForgotPassword(body) {
  try {
    const { email, otp } = body;
    const userData = await User.findOne({
      email,
    });

    if (!userData?._id) {
      throw new NotFoundError("User not found.");
    }

    const otpData = await Otp.findOne({
      otp, email, expiresIn: {
        $gt: moment().valueOf()
      }
    }, {}, { sort: { createdAt: -1 } })

    console.log("otpData", otpData);
    if (!otpData) {
      throw new NotFoundError("Invalid OTP.");
    }

    return { verified: true };
  } catch (err) {
    return Promise.reject(err);
  }
}

async function resetPassword(body) {
  try {
    const { email, newPassword } = body;
    const userData = await User.findOne({
      email,
    });

    if (!userData?._id) {
      throw new NotFoundError("User not found.");
    }

    const hashPassword = bcrypt.hashSync(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate({
      _id: userData._id,
    }, { password: hashPassword })

    return { changed: true };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  login,
  sendOTPForgotPassword,
  verifyOTPForgotPassword,
  resetPassword,
};
