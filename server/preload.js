// Add required Electron and Node functionality to the Window
const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  global.ipcRenderer = ipcRenderer;
  window.ipcRenderer = ipcRenderer;
});
