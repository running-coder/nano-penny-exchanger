const localtunnel = require("localtunnel");
const { Session } = require("./Session");

const Protocols = {
  HTTP: "http",
  HTTPS: "https"
};

// https://github.com/localtunnel/localtunnel/issues/332
const LOCAL_TUNNEL_PROTOCOL = "http";

const sendTunnelError = () => {
  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      serverError: {
        message: "Tunnel error"
      }
    })
  );
};

const setTunnel = async () => {
  const { LOCAL_TUNNEL_SUBDOMAIN } = getConfiguration();

  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      serverError: null
    })
  );

  if (!LOCAL_TUNNEL_SUBDOMAIN) return;

  const tunnel = await localtunnel({
    port: 8080,
    subdomain: LOCAL_TUNNEL_SUBDOMAIN,
    host: `${LOCAL_TUNNEL_PROTOCOL}://localtunnel.me`,
    // https://github.com/localtunnel/localtunnel/issues/332
    ...(LOCAL_TUNNEL_PROTOCOL === Protocols.HTTP
      ? {
          local_https: false,
          allow_invalid_cert: true
        }
      : {})
  }).catch(err => {
    console.log(err);
    sendTunnelError();
  });

  console.log(`Opening tunnel at ${tunnel.url}`);

  tunnel.on("error", err => {
    console.log(err);
    sendTunnelError();
  });

  tunnel.on("close", () => {
    console.log("Tunnel closed");
  });
};

exports.setTunnel = setTunnel;
exports.LOCAL_TUNNEL_PROTOCOL = LOCAL_TUNNEL_PROTOCOL;

const { getConfiguration } = require("./configuration");
