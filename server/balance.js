const { Session } = require("./Session");
const debounce = require("lodash/debounce");

const PulseToAmountMap = {
  1: 200, // 2$
  2: 100, // 1$
  3: 25, // 25c
  4: 10, // 10c
  5: 5 // 5c
};

let pulseCount = 0;

const addPulse = () => {
  pulseCount++;
};

const countPulses = debounce(() => {
  console.log("signalsCount->", pulseCount);

  Session.balance += PulseToAmountMap[pulseCount] || 0;
  pulseCount = 0;

  try {
    Session.mainWindow.webContents.send(
      "message",
      JSON.stringify({
        balance: Session.balance
      })
    );
  } catch (e) {
    // log error?
  }

  console.log("balance:", (Session.balance / 100).toFixed(2));
}, 250);

exports.countPulses = countPulses;
exports.addPulse = addPulse;
