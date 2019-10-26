const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const { getApplicationMenu } = require("../server/menu");
const { setTunnel } = require("../server/tunnel");

require("../server/websocket");
require("../server/arduino");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 320,
    icon: "./public/icon1024.png"
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
  createWindow();
  setTunnel();

  Menu.setApplicationMenu(Menu.buildFromTemplate(getApplicationMenu()));
});

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
