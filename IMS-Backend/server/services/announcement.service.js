const mongoose = require("mongoose");
const { Announcement } = mongoose.models;

async function getAnnouncements() {
  try {
    const announcements = await Announcement.find(
      {},
      {},
      { sort: { date: -1 } }
    )
      .populate("user", "firstName lastName middleName")
      .populate("course", "name");

    return announcements;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function createAnnouncement(body) {
  try {
    const { user, course, subject, date, description } = body;

    const announcementData = await Announcement.create({
      user,
      course,
      subject,
      date,
      description,
    });

    return announcementData;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  getAnnouncements,
  createAnnouncement,
};
