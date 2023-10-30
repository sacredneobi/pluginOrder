const { pluginEvent, defData } = require("../utils");

pluginEvent.on("init", (data, answer) => {
  const { login, password, order } = data;

  let newPluginData = defData(data, "init");

  console.log(newPluginData);

  answer({});
});
