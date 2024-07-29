const { validateBody } = require("../middlewares/validator");
const { loginSchema, sendOTPSchema, verifyOTPSchema, resetPasswordSchema } = require("../schema/auth.schema");
const { login, sendOTPForgotPassword, verifyOTPForgotPassword, resetPassword } = require("../services/auth.service");
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
  SendOTPForgotPassword: async (req, res, next) => {
    try {
      const resp = await sendOTPForgotPassword(req.body);
      res.formattedResponse(200, "OTP sent successfully", resp);
    } catch (err) {
      next(err);
    }
  },
  VerifyOTPForgotPassword: async (req, res, next) => {
    try {
      const resp = await verifyOTPForgotPassword(req.body);
      res.formattedResponse(200, "OTP verified successfully", resp);
    } catch (err) {
      next(err);
    }
  },
  ResetPassword: async (req, res, next) => {
    try {
      const resp = await resetPassword(req.body);
      res.formattedResponse(200, "Password changed successfully", resp);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = (server) => {
  server
    .post("/login", validateBody(loginSchema), ApiServices.Login)
    .get("/profile", jwtAuthenticator, ApiServices.GetProfile)
    .post("/forgot-password-otp", validateBody(sendOTPSchema), ApiServices.SendOTPForgotPassword)
    .post("/forgot-password-verify-otp", validateBody(verifyOTPSchema), ApiServices.VerifyOTPForgotPassword)
    .post("/reset-password", validateBody(resetPasswordSchema), ApiServices.ResetPassword);
};
