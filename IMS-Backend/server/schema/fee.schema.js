const Joi = require("@hapi/joi");

const createFeeInstallmentSchema = Joi.object({
  feesAmount: Joi.number().min(1).required(),
  remainingFees: Joi.number().min(1).required(),
  installmentNumber: Joi.number().min(1).required(),
  paymentType: Joi.string().trim().required(),
  paymentDate: Joi.date().optional(),
  student: Joi.string().trim().hex().length(24).required(),
});

module.exports = {
  createFeeInstallmentSchema,
};
