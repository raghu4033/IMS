const { validateBody } = require("../middlewares/validator");
const { createEventSchema } = require("../schema/event.schama");
const { createEvent, getEvents } = require("../services/event.service");

const ApiService = {
  getEvents: async (req, res, next) => {
    try {
      const users = await getEvents();
      res.formattedResponse(200, "Events fetch successfully", users);
    } catch (err) {
      next(err);
    }
  },
  createEvent: async (req, res, next) => {
    try {
      const users = await createEvent(req.body);
      res.formattedResponse(200, "Event created successfully", users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = (server) => {
  server
    .post("/event", validateBody(createEventSchema), ApiService.createEvent)
    .get("/events", ApiService.getEvents);
};
