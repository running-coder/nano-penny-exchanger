const Store = require("electron-store");
const store = new Store();
const configurationPath = "../configuration.json";

const generateRandomString = (
  length = 0,
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) =>
  Array.from(Array(length)).reduce(
    result =>
      result + possible.charAt(Math.floor(Math.random() * possible.length)),
    ""
  );

const getConfiguration = () => {
  let configuration = {};

  try {
    configuration = store.get(configurationPath) || {};
  } catch (e) {
    // Issue w/ store
  }

  if (!configuration.LOCAL_TUNNEL_SUBDOMAIN) {
    configuration.LOCAL_TUNNEL_SUBDOMAIN = generateRandomString(12);

    store.set(configurationPath, configuration);
  }

  return configuration;
};

const sendConfiguration = () => {
  let configuration = getConfiguration();

  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      configuration
    })
  );
};

const sendShowConfiguration = () => {
  Session.mainWindow.webContents.send("message", "showConfiguration");
};

const setConfiguration = configuration => {
  store.set(configurationPath, configuration);

  if (configuration.LOCAL_TUNNEL_SUBDOMAIN) {
    setTunnel();
  }

  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      configuration
    })
  );
};

exports.getConfiguration = getConfiguration;
exports.sendConfiguration = sendConfiguration;
exports.sendShowConfiguration = sendShowConfiguration;
exports.setConfiguration = setConfiguration;

const { Session } = require("./Session");
const { setTunnel } = require("./tunnel");
