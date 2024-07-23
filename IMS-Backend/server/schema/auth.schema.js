const Joi = require("@hapi/joi");

const loginSchema = Joi.object({
  emailOrSid: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

const sendOTPSchema = Joi.object({
  email: Joi.string().trim().required(),
});

const verifyOTPSchema = Joi.object({
  email: Joi.string().trim().required(),
  otp: Joi.number().required(),
});
const resetPasswordSchema = Joi.object({
  email: Joi.string().trim().required(),
  newPassword: Joi.string().trim().required(),
  confirmPassword: Joi.string().trim().required(),
});

module.exports = {
  loginSchema,
  sendOTPSchema,
  verifyOTPSchema,
  resetPasswordSchema
};
