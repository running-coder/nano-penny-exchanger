const { Board, Pin } = require("johnny-five");
const { addPulse, countPulses } = require("./balance");
const { Session } = require("./Session");

const COIN_ACCEPTOR_PIN = 2;

const board = new Board();

board.on("ready", () => {
  console.log("Ready!~");

  board.pinMode(COIN_ACCEPTOR_PIN, Pin.INPUT);
  board.digitalRead(COIN_ACCEPTOR_PIN, value => {
    console.log("value~~", value);

    if (value === board.io.HIGH) {
      addPulse();
    }

    countPulses();
  });
});

board.on("fail", error => {
  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      serverError: error
    })
  );
});
