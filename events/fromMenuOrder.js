const { pluginEvent, defData } = require("../utils");

pluginEvent.on("fromMenuOrder", (data, answer) => {
  const { login, password, order, columnSetting } = data;

  let newPluginData = defData(data, "fromMenuOrder");

  console.log(columnSetting);

  const buff = Buffer.from("Как дела?");

  answer({
    data: buff.toString("base64"),
    fileName: "text.txt",
    fileType: "text/plain",
  });
});
