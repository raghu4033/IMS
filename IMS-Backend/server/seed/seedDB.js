const { courses } = require("./constants");
const mongoose = require("mongoose");

module.exports = async () => {
  const { Course } = mongoose.models;
  const seedCourses = courses;

  const promises = seedCourses.map(async (c) => {
    await Course.findOneAndUpdate(
      {
        name: c,
      },
      {
        $setOnInsert: { name: c },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  });

  await Promise.allSettled(promises).then((i) => {
    i.forEach((p) => {
      if (p.status === "rejected") {
        console.log(p.reason);
      }
    });
  });

  console.log("Courses data seeded successfully.");
};
