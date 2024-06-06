require("dotenv").config();

const env = process.env;

const Configs = {
  PORT: env.PORT || 3000,
  MONGO_URL: env.MONGO_URL,
  JWT_SECRET: env.JWT_SECRET,
};

module.exports = {
  Configs,
};
