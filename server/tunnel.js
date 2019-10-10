const localtunnel = require("localtunnel");
const dotenv = require("dotenv");

dotenv.config();

(async () => {
  const tunnel = await localtunnel({
    port: 8080,
    subdomain: process.env.LOCAL_TUNNEL_SUBDOMAIN
  });

  console.log(`Opening tunnel at ${tunnel.url}`);

  tunnel.on("close", () => {
    // tunnels are closed
  });
})();
