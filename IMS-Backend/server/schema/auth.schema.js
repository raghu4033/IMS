const Joi = require("@hapi/joi");

const loginSchema = Joi.object({
  emailOrSid: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = {
  loginSchema,
};
