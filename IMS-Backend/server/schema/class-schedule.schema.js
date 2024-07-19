const Joi = require("@hapi/joi");

const createClassScheduleSchema = Joi.object({
  course: Joi.string().trim().hex().length(24).required(),
  faculty: Joi.string().trim().hex().length(24).required(),
  fromDate: Joi.date().optional(),
  toDate: Joi.date().optional(),
  classType: Joi.string().trim().required(),
  subject: Joi.string().trim().required(),
});

module.exports = {
  createClassScheduleSchema,
};
