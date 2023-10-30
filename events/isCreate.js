const { pluginEvent, defData } = require("../utils");

pluginEvent.on("isCreate", (data, answer) => {
  const { login, password, order } = data;

  let newPluginData = defData(data, "isCreate");

  console.log(newPluginData);

  answer({});
});
