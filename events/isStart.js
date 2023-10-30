const { pluginEvent, defData } = require("../utils");

pluginEvent.on("isStart", (data, answer) => {
  const { login, password, order } = data;

  let newPluginData = defData(data, "isStart");

  console.log(newPluginData);

  answer({});
});
