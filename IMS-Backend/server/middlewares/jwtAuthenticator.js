const { Configs } = require("../utils/config");
const { Constants } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = mongoose.models;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }

    const token = authHeader && authHeader.split(" ")[1];

    const user = jwt.verify(token, Configs.JWT_SECRET);

    const userDetails = await User.findOne({ _id: user?._id });

    if (!userDetails?._id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid authorization header" });
    }

    req.user = userDetails;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ statusCode: 401, message: "Invalid token" });
  }
};
