const electron = require("electron");
const debounce = require("lodash/debounce");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

const http = require("http");
const WebSocket = require("ws");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const wsServerHostname = "localhost";
const wsServerPort = "8080";

server.listen(wsServerPort, wsServerHostname, () => {
  console.log(`Server running at http://${wsServerHostname}:${wsServerPort}/`);
});

let hi;

wss.on("connection", function connection(ws) {
  hi = ws;
  ws.send(
    JSON.stringify({
      balance
    })
  );
});

const SignalsToAmounMap = {
  1: 200,
  2: 100,
  3: 25,
  4: 10,
  5: 5
};

let signalsCount = 0;
let balance = 0;
let ignoreInitialSignal = true;

const { Board, Pin } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  console.log("Ready!~");

  board.pinMode(2, Pin.INPUT);
  board.digitalRead(2, value => {
    console.log("value~~", value);
    if (value === 1) {
      if (ignoreInitialSignal) {
        ignoreInitialSignal = false;
      } else {
        signalsCount++;
      }
    }

    countSignals();
  });
});

const countSignals = debounce(value => {
  console.log("signalsCount->", signalsCount);

  balance += SignalsToAmounMap[signalsCount] || 0;
  signalsCount = 0;

  if (hi) {
    hi.send(
      JSON.stringify({
        balance: balance / 100
      })
    );
  }

  console.log("balance:", (balance / 100).toFixed(2));
}, 100);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    //   // Open the DevTools.
    //   //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
