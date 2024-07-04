const Joi = require("@hapi/joi");

const createAnnouncementSchema = Joi.object({
  subject: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  date: Joi.date().optional(),
  user: Joi.string().trim().hex().length(24).required(),
  course: Joi.string().trim().hex().length(24).required(),
});

module.exports = {
  createAnnouncementSchema,
};
