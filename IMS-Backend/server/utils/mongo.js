const mongoose = require("mongoose");
const { Configs } = require("./config");

async function mongoInitialize(callback) {
  const mongoUrl = Configs.MONGO_URL;

  if (!mongoUrl) {
    console.log("MongoDB Url is not set in environment variables.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...")
  
  mongoose.connect(mongoUrl);

  const dbInstance = mongoose.connection;

  dbInstance.on("open", () => {
    console.log("MongoDB connected successfully.");
    callback();
  });

  dbInstance.on("error", (err) => {
    console.log("Failed: ", err);
    process.exit(1);
  });
}

module.exports = { mongoInitialize };
