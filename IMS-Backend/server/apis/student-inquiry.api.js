const { validateBody } = require("../middlewares/validator");
const { createStudentInquirySchema } = require("../schema/student-inquiry.schama");
const {
  createStudentInquiry,
  getStudentInquiries,
} = require("../services/student-inquiry.service");

const ApiService = {
  getStudentInquiries: async (req, res, next) => {
    try {
      const users = await getStudentInquiries();
      res.formattedResponse(200, "Student Inquiries fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createStudentInquiry: async (req, res, next) => {
    try {
      const users = await createStudentInquiry(req.body);
      res.formattedResponse(200, "Student Inquiry created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .get("/student-inquiries", ApiService.getStudentInquiries)
    .post(
      "/student-inquiry",
      validateBody(createStudentInquirySchema),
      ApiService.createStudentInquiry
    );
};
