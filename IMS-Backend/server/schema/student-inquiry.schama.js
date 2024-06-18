const Joi = require("@hapi/joi");

const createStudentInquirySchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  mobile: Joi.string().trim().length(10).required(),
  whatsapp: Joi.string().trim().length(10).required(),
  joiningDate: Joi.date().required(),
  dob: Joi.date().required(),
  gender: Joi.string().trim().required(),
  reference: Joi.string().trim().optional(),
  qualification: Joi.string().trim().required(),
  course: Joi.string().trim().hex().length(24).required(),
});

module.exports = {
  createStudentInquirySchema,
};
