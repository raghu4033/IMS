const { validateBody } = require("../middlewares/validator");
const { loginSchema } = require("../schema/auth.schema");
const { login } = require("../services/auth.service");

const ApiServices = {
  Login: async (req, res, next) => {
    try {
      const resp = await login(req.body);
      res.formattedResponse(200, "Login successfully", resp);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server.post("/login", validateBody(loginSchema), ApiServices.Login);
};
