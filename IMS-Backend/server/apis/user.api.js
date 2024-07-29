const { validateBody } = require("../middlewares/validator");
const {
  createAdminSchema,
  createStudentSchema,
  createFacultySchema,
} = require("../schema/user.schama");
const {
  getUsers,
  createAdminUser,
  createStudentUser,
  createFacultyUser,
  getDashboardSummary,
} = require("../services/user.service");
const jwtAuthenticator = require("../middlewares/jwtAuthenticator");

const ApiService = {
  getUsers: async (req, res, next) => {
    try {
      const users = await getUsers({ query: req?.query || {} });
      res.formattedResponse(200, "Users fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createAdminUser: async (req, res, next) => {
    try {
      const users = await createAdminUser(req.body);
      res.formattedResponse(200, "User created successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createStudentUser: async (req, res, next) => {
    try {
      const users = await createStudentUser(req.body);
      res.formattedResponse(200, "User created successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createFacultyUser: async (req, res, next) => {
    try {
      const users = await createFacultyUser(req.body);
      res.formattedResponse(200, "User created successfully", users);
    } catch (err) {
      next(err);
    }
  },
  dashboardSummary: async (req, res, next) => {
    try {
      const users = await getDashboardSummary(req.user);
      res.formattedResponse(200, "User created successfully", users);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = (server) => {
  server
    .get("/users", ApiService.getUsers)
    .post(
      "/user/admin",
      validateBody(createAdminSchema),
      ApiService.createAdminUser
    )
    .post(
      "/user/student",
      validateBody(createStudentSchema),
      ApiService.createStudentUser
    )
    .post(
      "/user/faculty",
      validateBody(createFacultySchema),
      ApiService.createFacultyUser
    )
    .get(
      "/dashboard-summary",
      jwtAuthenticator,
      ApiService.dashboardSummary
    );
};
