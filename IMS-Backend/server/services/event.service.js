const mongoose = require("mongoose");
const { Event } = mongoose.models;

async function getEvents() {
  try {
    const events = await Event.find(
      {},
      {},
      { sort: { date: -1 } }
    ).populate("user", "firstName lastName middleName");

    return events;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createEvent(body) {
  try {
    const { name, place, date, user } = body;

    const eventData = await Event.create({
      name,
      place,
      date,
      user,
    });

    return eventData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getEvents,
  createEvent,
};
