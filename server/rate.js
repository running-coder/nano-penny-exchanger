const { net, ipcMain } = require("electron");
const { Session } = require("./Session");

const POLL_TIMEOUT = 30000;
const RATE_URL = "https://api.exchangeratesapi.io/latest?base=USD&symbols=CAD";

let pollTimeout = null;

const getRate = () => {
  const request = net.request(RATE_URL);
  request.on("response", response => {
    response.on("data", data => {
      try {
        const {
          rates: { CAD: rate }
        } = JSON.parse(data);

        Session.rate = rate;

        Session.mainWindow.webContents.send(
          "message",
          JSON.stringify({
            rate
          })
        );
      } catch (e) {
        // log something?
      }
    });
  });
  request.end();
};

const pollRate = () => {
  getRate();

  if (pollTimeout) {
    clearTimeout(pollTimeout);
    pollTimeout = null;
  }

  pollTimeout = setTimeout(() => {
    pollRate();
  }, POLL_TIMEOUT);
};

const stopPollRate = () => {
  clearTimeout(pollTimeout);
};

exports.getRate = getRate;
exports.pollRate = pollRate;
exports.stopPollRate = stopPollRate;
