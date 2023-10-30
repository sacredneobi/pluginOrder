const path = require("path");
const { loadSetting } = require("./utils");

const dirName =
  process.env.isFork === "true" ? __dirname : path.dirname(process.argv[0]);

loadSetting(dirName);

require("./events");
