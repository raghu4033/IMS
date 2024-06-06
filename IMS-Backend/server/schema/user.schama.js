const Joi = require("@hapi/joi");

const createAdminSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  mobile: Joi.string().trim().length(10).optional(),
  password: Joi.string().trim().required(),
});

const createFacultySchema = Joi.object({
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  dob: Joi.date().optional(),
  gender: Joi.string().trim().optional(),
  aadhar: Joi.string()
    .trim()
    .optional()
    .pattern(new RegExp("^[2-9]{1}[0-9]{3}s[0-9]{4}s[0-9]{4}$")),
  address: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  pin: Joi.string().trim().optional(),
  mobile: Joi.string().trim().length(10).optional(),
  academicYear: Joi.number().min(2000).max(new Date().getFullYear()).optional(),
  bloodGroup: Joi.string().trim().optional(),
  college: Joi.string().trim().optional(),
  qualification: Joi.string().trim().optional(),
  password: Joi.string().trim().required(),
});

const createStudentSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  dob: Joi.date().optional(),
  gender: Joi.string().trim().optional(),
  aadhar: Joi.string()
    .trim()
    .optional()
    .pattern(new RegExp("^[2-9]{1}[0-9]{3}s[0-9]{4}s[0-9]{4}$")),
  address: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  pin: Joi.string().trim().optional(),
  mobile: Joi.string().trim().length(10).optional(),
  academicYear: Joi.number().min(2000).max(new Date().getFullYear()).optional(),
  bloodGroup: Joi.string().trim().optional(),
  college: Joi.string().trim().optional(),
  qualification: Joi.string().trim().optional(),
  password: Joi.string().trim().required(),
});

module.exports = {
  createAdminSchema,
  createFacultySchema,
  createStudentSchema,
};
