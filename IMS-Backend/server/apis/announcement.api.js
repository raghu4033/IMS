const { validateBody } = require("../middlewares/validator");
const { createAnnouncementSchema } = require("../schema/announcement.schama");
const {
  createAnnouncement,
  getAnnouncements,
} = require("../services/announcement.service");

const ApiService = {
  getAnnouncements: async (req, res, next) => {
    try {
      const users = await getAnnouncements();
      res.formattedResponse(200, "Announcements fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createAnnouncement: async (req, res, next) => {
    try {
      const users = await createAnnouncement(req.body);
      res.formattedResponse(200, "Announcement created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post(
      "/announcement",
      validateBody(createAnnouncementSchema),
      ApiService.createAnnouncement
    )
    .get("/announcements", ApiService.getAnnouncements);
};
