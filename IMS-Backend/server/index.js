const express = require("express");
const { Configs } = require("./utils/config");
const { mongoInitialize } = require("./utils/mongo");
const handler = require("./handler");

const server = express();

const port = Configs.PORT;

mongoInitialize(() => {
  handler(server);
  server.listen(port, () => {
    console.log(`IMS-Backend server started on Port: ${port}`);
  });
});
