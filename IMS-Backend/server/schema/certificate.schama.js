const Joi = require("@hapi/joi");

const createCertificateSchema = Joi.object({
  date: Joi.date().optional(),
  student: Joi.string().trim().hex().length(24).required(),
  course: Joi.string().trim().hex().length(24).required(),
  certificateGrade: Joi.string().trim().required(),
  studentName: Joi.string().trim().required(),
  sid: Joi.string().trim().required()
});

module.exports = {
  createCertificateSchema,
};
