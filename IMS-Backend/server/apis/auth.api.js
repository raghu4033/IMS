const { validateBody } = require("../middlewares/validator");
const { loginSchema } = require("../schema/auth.schema");
const { login } = require("../services/auth.service");
const jwtAuthenticator = require("../middlewares/jwtAuthenticator");

const ApiServices = {
  Login: async (req, res, next) => {
    try {
      const resp = await login(req.body);
      res.formattedResponse(200, "Login successfully", resp);
    } catch (err) {
      next(err);
    }
  },
  GetProfile: async (req, res, next) => {
    try {
      res.formattedResponse(200, "Profile fetch successfully", req.user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post("/login", validateBody(loginSchema), ApiServices.Login)
    .get("/profile", jwtAuthenticator, ApiServices.GetProfile);
};
