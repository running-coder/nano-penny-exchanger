const http = require("http");
const HttpDispatcher = require("httpdispatcher");
const { ipcMain } = require("electron");
const { Session } = require("./Session");
const { getPrice, pollPrice, stopPollPrice } = require("./price");
const { getRate, pollRate, stopPollRate } = require("./rate");

const { sendConfiguration, setConfiguration } = require("./configuration");
const {
  deleteWebhooks,
  subscribeToWebhook,
  sendTransaction
} = require("./snapy");

const dispatcher = new HttpDispatcher();

const server = http.createServer(function(req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000 // 30 days
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (["GET", "POST"].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    dispatcher.dispatch(req, res);
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);

  dispatcher.dispatch(req, res);
});

dispatcher.onPost("/send", function(req, res) {
  res.end("success");

  sendTransaction();
});

dispatcher.onPost("/callbacks", function(req, res) {
  res.end("success");
  console.log("Callback Webhook called");

  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      isConfirmed: true
    })
  );
});

// const wss = new WebSocket.Server({ server });

ipcMain.on("start-app", () => {
  sendConfiguration();
  listenForMessages();
});

ipcMain.on("online-status-changed", (_event, status) => {
  console.log(status);

  if (status === "online") {
    pollPrice();
    pollRate();
  } else {
    stopPollPrice();
    stopPollRate();
  }
});

const wsServerHostname = "localhost";
const wsServerPort = "8080";

server.listen(wsServerPort, wsServerHostname, () => {
  console.log(`Server running at http://${wsServerHostname}:${wsServerPort}/`);
});

const listenForMessages = () => {
  ipcMain.on("message", async (_event, message) => {
    try {
      const { address, method, configuration } = JSON.parse(message);

      console.log("~~~~message", message);

      if (address) {
        Session.address = address;

        await deleteWebhooks();

        const isSubscribed = await subscribeToWebhook(address);

        Session.mainWindow.webContents.send(
          "message",
          JSON.stringify({
            isSubscribed: !!isSubscribed
          })
        );
      } else if (configuration) {
        setConfiguration(configuration);
      } else if (method === "reset") {
        Session.reset();
      } else if (method === "getBalance") {
        Session.mainWindow.webContents.send(
          "message",
          JSON.stringify({
            balance: Session.balance
          })
        );
      } else if (method === "getPrice") {
        getPrice();
      } else if (method === "getRate") {
        getRate();
      }
    } catch (e) {
      // log error?
    }
  });
};
