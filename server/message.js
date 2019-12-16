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

ipcMain.on("start-app", () => {
  sendConfiguration();
});

ipcMain.on("online-status-changed", (_event, isOnline) => {
  if (isOnline) {
    pollPrice();
    pollRate();
  } else {
    stopPollPrice();
    stopPollRate();
  }
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

        console.log("isSubscribed", isSubscribed, address);

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
      } else if (method === "send") {
        sendTransaction();
      }
    } catch (e) {
      // log error?
    }
  });
};

exports.listenForMessages = listenForMessages;
