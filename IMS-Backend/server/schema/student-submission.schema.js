const Joi = require("@hapi/joi");

const createStudentSubmissionSchema = Joi.object({
  fileUrl: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  submission: Joi.string().trim().hex().length(24).required(),
});

module.exports = {
  createStudentSubmissionSchema,
};
