const defData = (data, type) => {
  console.debug(`PLUGIN_DATA][${type}`, data?.pluginData);

  let newPluginData = {};
  try {
    newPluginData = data?.pluginData ? JSON.parse(data?.pluginData) : {};
  } catch (err) {
    console.error("PLUGIN_DATA", err);
  }
  return newPluginData;
};

module.exports = { defData };
