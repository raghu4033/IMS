const Joi = require("@hapi/joi");

const createSubmissionSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  fromDate: Joi.date().optional(),
  toDate: Joi.date().optional(),
});

module.exports = {
  createSubmissionSchema,
};
