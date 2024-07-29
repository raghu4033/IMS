const { validateBody } = require("../middlewares/validator");
const { createAttendanceSchema } = require("../schema/attendance.schama");
const {
  createAttendance,
  getAttendances,
} = require("../services/attendance.service");
const jwtAuthenticator = require("../middlewares/jwtAuthenticator");

const ApiService = {
  getAttendances: async (req, res, next) => {
    try {
      const users = await getAttendances(req.user);
      res.formattedResponse(200, "Attendances fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createAttendance: async (req, res, next) => {
    try {
      const users = await createAttendance(req.body, req.user);
      res.formattedResponse(200, "Attendance created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post(
      "/attendance",
      validateBody(createAttendanceSchema),
      jwtAuthenticator,
      ApiService.createAttendance
    )
    .get("/attendances", jwtAuthenticator, ApiService.getAttendances);
};
