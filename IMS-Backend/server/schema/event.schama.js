const Joi = require("@hapi/joi");

const createEventSchema = Joi.object({
  name: Joi.string().trim().required(),
  place: Joi.string().trim().required(),
  date: Joi.date().optional(),
  user: Joi.string().trim().hex().length(24).required(),
});

module.exports = {
  createEventSchema,
};
