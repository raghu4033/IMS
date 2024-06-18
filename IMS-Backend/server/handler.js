const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const { loadAllModels, loadAllApis } = require("./utils/auto-loader");

const formattedResponse = require("./middlewares/formattedResponse");
const errorHandler = require("./middlewares/errorHandler");
const seedDB = require("./seed/seedDB");

module.exports = function (server) {
  // attaching middlewares to express server
  server.use(cors())
  server.use(express.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(formattedResponse);

  server.get("/api/v1", (req, res) => {
    return res.formattedResponse(200, "Welcome to IMS Backend");
  });

  // load all mongodb models
  loadAllModels();
  loadAllApis(server);

  // seed collections
  seedDB();

  server.use(errorHandler);
  server.use(notFound);
};
