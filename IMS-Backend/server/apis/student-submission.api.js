const { validateBody } = require("../middlewares/validator");
const {
  createStudentSubmissionSchema,
} = require("../schema/student-submission.schema");
const {
  createSubmission,
  getSubmissions,
} = require("../services/student-submission.service");
const jwtAuthenticator = require("../middlewares/jwtAuthenticator");

const ApiService = {
  getSubmissions: async (req, res, next) => {
    try {
      const users = await getSubmissions(req.user, req.query);
      res.formattedResponse(200, "Submissions fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createSubmission: async (req, res, next) => {
    try {
      const users = await createSubmission(req.body, req.user);
      res.formattedResponse(200, "Submission created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post(
      "/student-submission",
      validateBody(createStudentSubmissionSchema),
      jwtAuthenticator,
      ApiService.createSubmission
    )
    .get("/student-submissions", jwtAuthenticator, ApiService.getSubmissions);
};
