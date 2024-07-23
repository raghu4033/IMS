require("dotenv").config();

const env = process.env;

const Configs = {
  PORT: env.PORT || 3000,
  MONGO_URL: env.MONGO_URL,
  JWT_SECRET: env.JWT_SECRET,
  MAIL_HOST: env.MAIL_HOST,
  MAIL_USERNAME: env.MAIL_USERNAME,
  MAIL_PORT: env.MAIL_PORT,
  MAIL_PASSWORD: env.MAIL_PASSWORD,
};

module.exports = {
  Configs,
};
