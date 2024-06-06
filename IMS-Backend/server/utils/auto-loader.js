const { readdirSync } = require("fs");
const path = require("path");

const defaultSrcDir = path.join(process.cwd(), "server");

const loadAllModels = () => {
  const modelDir = path.join(defaultSrcDir, "models");

  const filterModels = readdirSync(modelDir)
    .filter((fileName) => path.extname(fileName) === ".js")
    .map((model) => model.replace(".js", ""));

  filterModels.forEach((m) => {
    require(path.join(modelDir, m));
  });

  console.log("loaded models: ", filterModels.join(", "));
};

const loadAllApis = (server) => {
  const apiDir = path.join(defaultSrcDir, "apis");

  const filterApis = readdirSync(apiDir)
    .filter((fileName) => path.extname(fileName) === ".js")
    .map((model) => model.replace(".js", ""));

  filterApis.forEach((a) => {
    require(path.join(apiDir, a))(server);
  });

  console.log("loaded apis: ", filterApis.join(", "));
};

module.exports = {
  loadAllModels,
  loadAllApis,
};
