/// <reference types="electron" />

declare module "react-router-page-transition";

interface Window {
  ipcRenderer: Electron.IpcRenderer;
}
