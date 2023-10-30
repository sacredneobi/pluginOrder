const { pluginEvent, defData } = require("../utils");

pluginEvent.on("isDone", (data, answer) => {
  const { login, password, order } = data;

  let newPluginData = defData(data, "isDone");

  console.log(newPluginData);

  answer({});
});
