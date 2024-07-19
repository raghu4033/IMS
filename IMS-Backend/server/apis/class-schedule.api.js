const jwtAuthenticator = require("../middlewares/jwtAuthenticator");
const { validateBody } = require("../middlewares/validator");
const {
  createClassScheduleSchema,
} = require("../schema/class-schedule.schema");
const { createFeeInstallmentSchema } = require("../schema/fee.schema");
const {
  getClassSchedules,
  createClassSchedule,
} = require("../services/class-schedule.service");
const { createFeeInstallment, getFees } = require("../services/fees.service");

const ApiService = {
  getClassSchedules: async (req, res, next) => {
    try {
      const users = await getClassSchedules(req.user, {
        query: req.query,
      });
      res.formattedResponse(200, "Schedules fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createClassSchedule: async (req, res, next) => {
    try {
      const users = await createClassSchedule(req.body);
      res.formattedResponse(200, "Class scheduled successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post(
      "/class-schedule",
      validateBody(createClassScheduleSchema),
      ApiService.createClassSchedule
    )
    .get("/classes", jwtAuthenticator, ApiService.getClassSchedules);
};
