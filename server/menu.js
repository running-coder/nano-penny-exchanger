const { app, shell } = require("electron");

const repository = `https://github.com/running-coder/nano-penny-exchanger`;

const loadExternal = url => {
  shell.openExternal(url);
};

const getApplicationMenu = () => {
  const template = [
    { role: "editMenu" },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      role: "help",
      submenu: [
        {
          label: "Configuration",
          click() {
            sendShowConfiguration();
          }
        },
        { type: "separator" },
        {
          label: "View GitHub",
          click() {
            loadExternal(`${repository}`);
          }
        },
        {
          label: "Submit Issue",
          click() {
            loadExternal(`${repository}/issues/new`);
          }
        },
        { type: "separator" },
        {
          type: "normal",
          label: `${app.getName()} Version: ${app.getVersion()}`
        },
        {
          label: "View Latest Updates",
          click() {
            loadExternal(`${repository}/releases`);
          }
        }
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "hide" },
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    });
  }
  return template;
};

exports.getApplicationMenu = getApplicationMenu;

const { sendShowConfiguration } = require("./configuration");
