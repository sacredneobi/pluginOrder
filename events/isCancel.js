const { pluginEvent, defData } = require("../utils");

pluginEvent.on("isCancel", (data, answer) => {
  const { login, password, order } = data;

  let newPluginData = defData(data, "isCancel");

  console.log(newPluginData);

  answer({});
});
