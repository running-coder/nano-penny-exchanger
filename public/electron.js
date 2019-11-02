const { join } = require("path");
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { Session } = require("../server/Session");
const { getApplicationMenu } = require("../server/menu");
const { setTunnel } = require("../server/tunnel");

require("../server/server");
require("../server/arduino");

function createWindow() {
  Session.mainWindow = new BrowserWindow({
    width: 480,
    height: 320,
    icon: "./public/icon.png",
    webPreferences: {
      preload: join(__dirname, "../server/preload.js")
    }
  });

  Session.mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  Session.mainWindow.on("closed", () => (Session.mainWindow = null));
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
  if (Session.mainWindow === null) {
    createWindow();
  }
});
