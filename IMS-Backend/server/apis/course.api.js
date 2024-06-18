const { getCourses } = require("../services/course.service");

const ApiService = {
  getCourses: async (req, res, next) => {
    try {
      const users = await getCourses();
      res.formattedResponse(200, "Courses fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server.get("/courses", ApiService.getCourses);
};
