const localtunnel = require("localtunnel");
const { getConfiguration } = require("./configuration");

(async () => {
  const { LOCAL_TUNNEL_SUBDOMAIN } = getConfiguration();

  const tunnel = await localtunnel({
    port: 8080,
    subdomain: LOCAL_TUNNEL_SUBDOMAIN
  });

  console.log(`Opening tunnel at ${tunnel.url}`);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();
