/// <reference types="electron" />

declare module "react-router-page-transition";
declare module 'lodash.debounce';

interface Window {
  ipcRenderer: Electron.IpcRenderer;
}
