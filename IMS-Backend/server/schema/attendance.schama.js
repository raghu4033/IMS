const Joi = require("@hapi/joi");

const createAttendanceSchema = Joi.object({
  date: Joi.date().optional(),
  course: Joi.string().trim().hex().length(24).required(),
  students: Joi.array().required()
});

module.exports = {
  createAttendanceSchema,
};
