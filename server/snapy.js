const { net } = require("electron");
const { Session } = require("./classes/Session");

const { getConfiguration } = require("./configuration");

const SNAPY_API_BASE_URL = "https://snapy.io/api/v1";

// CREATE SNAPY WALLET

// const { SNAPY_API_KEY, SNAPY_API_PASSWORD } = getConfiguration();

// const createWalletRequest = net.request({
//   url: `${SNAPY_API_BASE_URL}/wallets`,
//   method: "POST",
//   protocol: "https"
// });

// const data = JSON.stringify({
//   password: SNAPY_API_PASSWORD
// });

// createWalletRequest.setHeader("Content-Type", "application/json");
// createWalletRequest.setHeader("Content-Length", data.length);
// createWalletRequest.setHeader("x-api-key", env.SNAPY_API_KEY);

// createWalletRequest.on("response", response => {
//   response.on("data", data => {
//     console.log(data.toString());
//   });
// });

// createWalletRequest.write(data);

// createWalletRequest.end();

// CREATE SNAPY ADDRESS
// const createAddressRequest = net.request({
//   url: `${SNAPY_API_BASE_URL}/address`,
//   method: "POST",
//   protocol: "https"
// });

// const { SNAPY_API_KEY } = getConfiguration();

// createAddressRequest.setHeader("x-api-key", SNAPY_API_KEY);

// createAddressRequest.on("response", response => {
//   response.on("data", data => {
//     console.log(data.toString());
//   });
// });

// createAddressRequest.end();

// VIEW ADDRESS BALANCE
// const getAddressBalanceRequest = net.request({
//   url: `${SNAPY_API_BASE_URL}/balance`,
//   method: "GET",
//   protocol: "https"
// });

// const { SNAPY_API_KEY } = getConfiguration();

// getAddressBalanceRequest.setHeader("x-api-key", SNAPY_API_KEY);

// getAddressBalanceRequest.on("response", response => {
//   response.on("data", data => {
//     console.log(data.toString());
//   });
// });

// getAddressBalanceRequest.end();

// VIEW STATUS NODES
// const getStatusNodesRequest = net.request({
//   url: `${SNAPY_API_BASE_URL}/statusnodes`,
//   method: "GET",
//   protocol: "https"
// });

// const { SNAPY_API_KEY } = getConfiguration();

// getStatusNodesRequest.setHeader("x-api-key", SNAPY_API_KEY);

// getStatusNodesRequest.on("response", response => {
//   response.on("data", data => {
//     console.log(data.toString());
//   });
// });

// getStatusNodesRequest.end();

const deleteWebhooks = () => {
  return new Promise(function(resolve, reject) {
    let requestCounter = 0;
    let subscriptionIds = [];
    const request = net.request({
      url: `${SNAPY_API_BASE_URL}/webhooks/subscriptions`,
      method: "GET",
      protocol: "https"
    });

    const { SNAPY_API_KEY } = getConfiguration();

    request.setHeader("x-api-key", SNAPY_API_KEY);

    request.on("response", response => {
      response.on("data", data => {
        try {
          const { subscriptions } = JSON.parse(data.toString());

          Object.keys(subscriptions).forEach(address => {
            subscriptions[address].forEach(({ id }) => {
              if (!id) return;

              subscriptionIds.push(id);
            });
          });

          if (!subscriptionIds.length) {
            resolve(true);
          } else {
            subscriptionIds.forEach(id => {
              const deleteRequest = net.request({
                url: `${SNAPY_API_BASE_URL}/webhooks/subscriptions/${id}`,
                method: "DELETE",
                protocol: "https"
              });

              deleteRequest.on("response", response => {
                response.on("data", data => {
                  requestCounter++;

                  if (subscriptionIds.length === requestCounter) {
                    resolve(true);
                  }
                });
              });

              deleteRequest.setHeader("x-api-key", SNAPY_API_KEY);
              deleteRequest.end();
            });
          }
        } catch (e) {
          // log error?
          reject();
        }
      });
    });

    request.end();
  });
};

// SUBSCRIBE TO WEBHOOK
const subscribeToWebhook = address => {
  return new Promise(function(resolve, reject) {
    const request = net.request({
      url: `${SNAPY_API_BASE_URL}/webhooks/address`,
      method: "POST",
      protocol: "https"
    });

    const { SNAPY_API_KEY, LOCAL_TUNNEL_SUBDOMAIN } = getConfiguration();

    const data = JSON.stringify({
      address,
      url: `https://${LOCAL_TUNNEL_SUBDOMAIN}.localtunnel.me/callbacks`,
      confirmations: 3
    });

    request.setHeader("Content-Type", "application/json");
    request.setHeader("Content-Length", data.length);
    request.setHeader("x-api-key", SNAPY_API_KEY);

    request.on("response", response => {
      response.on("data", data => {
        try {
          const { status } = JSON.parse(data.toString());

          resolve(status === "success");
        } catch (e) {
          // log error?
          reject();
        }
      });
    });

    request.on("error", () => {
      reject();
    });

    request.write(data);

    request.end();
  });
};

// SEND NANO TRANSACTION
const sendTransaction = forceAmount => {
  const MAX_DECIMALS = 1000000;

  const amount =
    forceAmount ||
    Math.floor(
      (Session.balance / Session.rate / Session.price / 100) * MAX_DECIMALS
    );

  const {
    SNAPY_API_KEY,
    SNAPY_API_PASSWORD,
    SNAPY_NANO_ADDRESS
  } = getConfiguration();

  const request = net.request({
    url: `${SNAPY_API_BASE_URL}/send`,
    method: "POST",
    protocol: "https"
  });

  const data = JSON.stringify({
    to: Session.address,
    from: SNAPY_NANO_ADDRESS,
    amount,
    password: SNAPY_API_PASSWORD
  });

  request.setHeader("Content-Type", "application/json");
  request.setHeader("Content-Length", data.length);
  request.setHeader("x-api-key", SNAPY_API_KEY);

  request.on("response", response => {
    response.on("data", data => {
      try {
        const { hash } = JSON.parse(data.toString());

        Session.balance = 0;
        Session.ws.send(
          JSON.stringify({
            hash
          })
        );
      } catch (e) {
        // transaction failed to be sent
      }
    });
  });

  request.write(data);

  request.end();
};

exports.deleteWebhooks = deleteWebhooks;
exports.subscribeToWebhook = subscribeToWebhook;
exports.sendTransaction = sendTransaction;
