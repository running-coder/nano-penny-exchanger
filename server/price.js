const { net, ipcMain } = require("electron");
const { Session } = require("./Session");

const POLL_TIMEOUT = 30000;
const PRICE_URL = "https://api.binance.com/api/v3/ticker/price?symbol=NANOUSDT";

let pollTimeout = null;

const getPrice = () => {
  const request = net.request(PRICE_URL);
  request.on("response", response => {
    response.on("data", data => {
      try {
        const { price } = JSON.parse(data);

        Session.price = price;

        Session.mainWindow.webContents.send(
          "message",
          JSON.stringify({
            price
          })
        );
      } catch (e) {
        // log something?
      }
    });
  });
  request.end();
};

const pollPrice = () => {
  getPrice();

  if (pollTimeout) {
    clearTimeout(pollTimeout);
    pollTimeout = null;
  }

  pollTimeout = setTimeout(() => {
    pollPrice();
  }, POLL_TIMEOUT);
};

const stopPollPrice = () => {
  clearTimeout(pollTimeout);
};

exports.getPrice = getPrice;
exports.pollPrice = pollPrice;
exports.stopPollPrice = stopPollPrice;
