const { net } = require("electron");
const { Session } = require("./Session");

const POLL_PRICE_TIMEOUT = 30000;
const NANO_USDT_URL =
  "https://api.binance.com/api/v3/ticker/price?symbol=NANOUSDT";

let pollTimeout = null;

const getPrice = () => {
  const request = net.request(NANO_USDT_URL);
  request.on("response", response => {
    response.on("data", data => {
      try {
        const { price } = JSON.parse(data);

        Session.price = price;
        Session.ws.send(
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

  clearTimeout(pollTimeout);
  pollTimeout = setTimeout(() => {
    pollPrice();
  }, POLL_PRICE_TIMEOUT);
};

const initPollPrice = () => {
  pollPrice();
  Session.ws.on("message", message => {
    try {
      const { method } = JSON.parse(message);
      if (method === "getPrice") {
        getPrice();
      }
    } catch (e) {
      // log error?
    }
  });
};

exports.initPollPrice = initPollPrice;
