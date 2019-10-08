const { Board, Pin } = require("johnny-five");
const { addPulse, countPulses } = require("./balance");
const board = new Board();

let ignoreInitialPulses = true;

board.on("ready", () => {
  console.log("Ready!~");

  board.pinMode(2, Pin.INPUT);
  board.digitalRead(2, value => {
    if (ignoreInitialPulses) return;

    console.log("value~~", value);
    if (value === 1) {
      addPulse();
    }

    countPulses();
  });

  // Give it 3 seconds after the app is started to start considering pulses
  setTimeout(() => {
    ignoreInitialPulses = false;
  }, 3000);
});
