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
    // File doesn't exist
  }

  if (!configuration.LOCAL_TUNNEL_SUBDOMAIN) {
    configuration.LOCAL_TUNNEL_SUBDOMAIN = generateRandomString(12);

    store.set(configurationPath, configuration);
  }

  return configuration;
};

const sendConfiguration = async () => {
  let configuration = getConfiguration();

  Session.ws.send(
    JSON.stringify({
      configuration
    })
  );
};

const sendShowConfiguration = () => {
  Session.ws.send("showConfiguration");
};

const setConfiguration = async configuration => {
  store.set(configurationPath, configuration);

  if (configuration.LOCAL_TUNNEL_SUBDOMAIN) {
    setTunnel();
  }

  Session.ws.send(
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
