const { validateBody } = require("../middlewares/validator");
const { createFeeInstallmentSchema } = require("../schema/fee.schema");
const { createFeeInstallment, getFees } = require("../services/fees.service");

const ApiService = {
  getFees: async (req, res, next) => {
    try {
      const users = await getFees({ query: req.query });
      res.formattedResponse(200, "Fees fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createFee: async (req, res, next) => {
    try {
      const users = await createFeeInstallment(req.body);
      res.formattedResponse(200, "Fee installment created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post(
      "/fee-installment",
      validateBody(createFeeInstallmentSchema),
      ApiService.createFee
    )
    .get("/fees", ApiService.getFees);
};
