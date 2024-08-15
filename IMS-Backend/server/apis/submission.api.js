const { validateBody } = require("../middlewares/validator");
const { createSubmissionSchema } = require("../schema/submission.schema");
const {
  createSubmission,
  getSubmissions,
} = require("../services/submission.service");
const jwtAuthenticator = require("../middlewares/jwtAuthenticator");

const ApiService = {
  getSubmissions: async (req, res, next) => {
    try {
      const users = await getSubmissions(req.user);
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
      "/submission",
      validateBody(createSubmissionSchema),
      jwtAuthenticator,
      ApiService.createSubmission
    )
    .get("/submissions", jwtAuthenticator, ApiService.getSubmissions);
};
