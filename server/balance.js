const { wss } = require("./websocket.js");
const debounce = require("lodash/debounce");

const PulseToAmountMap = {
  1: 200, // 2$
  2: 100, // 1$
  3: 25, // 25c
  4: 10, // 10c
  5: 5 // 5c
};

let ws = null;
let pulseCount = 0;
let balance = 0;

wss.on("connection", wsc => {
  ws = wsc;
  ws.send(
    JSON.stringify({
      balance
    })
  );
});

const addPulse = () => {
  pulseCount++;
};

const countPulses = debounce(() => {
  console.log("signalsCount->", pulseCount);

  balance += PulseToAmountMap[pulseCount] || 0;
  pulseCount = 0;

  try {
    ws.send(
      JSON.stringify({
        balance
      })
    );
  } catch (e) {
    // log error?
  }

  console.log("balance:", (balance / 100).toFixed(2));
}, 250);

exports.addPulse = addPulse;
exports.countPulses = countPulses;
