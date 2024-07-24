const { validateBody } = require("../middlewares/validator");
const { createCertificateSchema } = require("../schema/certificate.schama");
const {
  createCertificate,
  getCertificates,
} = require("../services/certificate.service");
const jwtAuthenticator = require("../middlewares/jwtAuthenticator");

const ApiService = {
  getCertificates: async (req, res, next) => {
    try {
      const users = await getCertificates(req.user);
      res.formattedResponse(200, "Certificates fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createCertificate: async (req, res, next) => {
    try {
      const users = await createCertificate(req.body, req.user);
      res.formattedResponse(200, "Certificate created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post(
      "/certificate",
      validateBody(createCertificateSchema),
      jwtAuthenticator,
      ApiService.createCertificate
    )
    .get("/certificates", jwtAuthenticator, ApiService.getCertificates);
};
