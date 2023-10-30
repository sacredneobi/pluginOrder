const { pluginEvent, defData } = require("../utils");

pluginEvent.on("isFullDone", (data, answer) => {
  const { login, password, order } = data;

  let newPluginData = defData(data, "isFullDone");

  console.log(newPluginData);

  answer({});
});
