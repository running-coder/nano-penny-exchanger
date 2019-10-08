const { net } = require("electron");
const { wss } = require("./websocket");

const POLL_RATE_TIMEOUT = 30000;
// https://exchangeratesapi.io/
const CAD_TO_USD_URL =
  "https://api.exchangeratesapi.io/latest?base=USD&symbols=CAD";

let ws = null;
let pollTimeout = null;

const getRate = () => {
  const request = net.request(CAD_TO_USD_URL);
  request.on("response", response => {
    response.on("data", data => {
      try {
        const {
          rates: { CAD }
        } = JSON.parse(data);

        ws.send(
          JSON.stringify({
            rate: CAD
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

  clearTimeout(pollTimeout);
  pollTimeout = setTimeout(() => {
    pollRate();
  }, POLL_RATE_TIMEOUT);
};

wss.on("connection", wsc => {
  pollRate();
  ws = wsc;
  ws.on("message", message => {
    try {
      const { method } = JSON.parse(message);
      if (method === "getRate") {
        getRate();
      }
    } catch (e) {
      // log error?
    }
  });
});

exports.pollRate = pollRate;
