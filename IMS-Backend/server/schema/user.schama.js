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
  department: Joi.string().trim().required(),
  yearOfExperience: Joi.number().min(0).required(),
  joiningDate: Joi.date().optional(),
  qualification: Joi.string().trim().optional(),
  salary: Joi.number().min(1).required(),
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  dob: Joi.date().optional(),
  gender: Joi.string().trim().optional(),
  cast: Joi.string().trim().optional(),
  nationality: Joi.string().trim().optional(),
  permanentAddress: Joi.string().trim().optional(),
  presentAddress: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  pin: Joi.string().trim().optional(),
  mobile: Joi.string().trim().length(10).optional(),
  email: Joi.string().trim().email().required(),
  bloodGroup: Joi.string().trim().optional(),
  bankName: Joi.string().trim().required(),
  accountName: Joi.string().trim().required(),
  ifscCode: Joi.string().trim().required(),
  accountNumber: Joi.string().trim().required(),
});

const createStudentSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  middleName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  mobile: Joi.string().trim().length(10).optional(),
  email: Joi.string().trim().email().required(),
  dob: Joi.date().optional(),
  joiningDate: Joi.date().optional(),
  gender: Joi.string().trim().optional(),
  nationality: Joi.string().trim().optional(),
  bloodGroup: Joi.string().trim().optional(),
  cast: Joi.string().trim().optional(),
  permanentAddress: Joi.string().trim().optional(),
  presentAddress: Joi.string().trim().optional(),
  pin: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  pin: Joi.string().trim().optional(),
  academicYear: Joi.string().optional(),
  parentsName: Joi.string().trim().optional(),
  parentsMobile: Joi.string().trim().length(10).optional(),
  totalFees: Joi.number().min(1).required(),
  batchName: Joi.string().trim().optional(),
  course: Joi.string().trim().hex().length(24).required(),
});

module.exports = {
  createAdminSchema,
  createFacultySchema,
  createStudentSchema,
};
