const { EventEmitter } = require("events");
const fs = require("fs");
const path = require("path");

let config = {
  name: "_XXX_",
  version: "x.x.x",
  description: "test module",
  type: "xxx",
};

const fileConfig = path.resolve(`${__dirname}/../package.json`);

if (fs.existsSync(fileConfig)) {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(fileConfig, "utf8")) };
  } catch (error) {
    console.logErr(error);
  }
}

console.success = function (name, ...args) {
  console.log(
    `\x1b[32m[${config?.name?.toUpperCase()}][SUCCESS][PLUGIN][${name?.toUpperCase()}]\x1b[0m:`,
    ...args
  );
};

console.error = function (name, ...args) {
  console.log(
    `\x1b[31m[${config?.name?.toUpperCase()}][ERROR][PLUGIN][${name?.toUpperCase()}]\x1b[0m:`,
    ...args
  );
};

console.done = function (name, ...args) {
  console.log(
    `\x1b[34m[${config?.name?.toUpperCase()}][DONE][PLUGIN][${name?.toUpperCase()}]\x1b[0m:`,
    ...args
  );
};

console.debug = function (name, ...args) {
  console.log(`----------------------------------------`);
  console.log(
    `\x1b[34m[${config?.name?.toUpperCase()}][DEBUG][PLUGIN][${name?.toUpperCase()}]\x1b[0m:`,
    ...args
  );
  console.log(`----------------------------------------`);
};

class PluginEvent extends EventEmitter {
  _isDebug = false;
  #plugin = {};

  constructor(plugin) {
    super();
    this.#plugin = plugin;
    this.init(plugin);
  }

  init(plugin) {
    console.done("LOADING", plugin.name);
    process.on("message", async (data) => {
      const { eventId, eventName, ...other } = data;

      if (this._isDebug) {
        console.debug("GET DATA PLUGIN", JSON.stringify(data));
      }

      const event = (data) => {
        if (this._isDebug) {
          console.debug(
            "SEND DATA PLUGIN",
            JSON.stringify({ eventId, ...data }).slice(0, 100)
          );
        }
        process.send({ eventId, data });
      };

      this.emit(eventName, other, event);
    });

    this.on("getName", (data, event) => {
      event(plugin);
      this._isDebug = data?.isDebug ? data?.isDebug : false;
    });
  }

  sendToMain(eventName, data) {
    if (this._isDebug) {
      console.debug(
        "SEND DATA PLUGIN",
        JSON.stringify({ name: this.#plugin.name, eventName, data })
      );
    }
    process.send({ name: this.#plugin.name, eventName, data });
  }
}

process.mainConfig = {
  name: config.caption,
  version: config.version,
  description: config.description,
  icon: config.icon,
  type: config.typeModule,
  externalService: config.externalService,
  needInit: config.needInit,
  url: config.url,
};

const pluginEvent = new PluginEvent(process.mainConfig);

module.exports = { pluginEvent };
