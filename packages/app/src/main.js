const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");
let win, winState;

app.on("ready", () => {
  // setup window state from history or defaults
  winState = windowStateKeeper();

  // create the window
  win = new BrowserWindow({
    title: "Shuffle App",
    // icon: "",
    show: false,
    x: winState.x,
    y: winState.y,
    height: winState.height,
    width: winState.width,
    backgroundColor: "#2a292f",
    webPreferences: { nodeIntegration: true }
  });

  // keep state updated
  winState.manage(win);

  // load the template
  win.loadFile("src/app.html");

  // show once loaded
  win.on("ready-to-show", win.show);

  // open dev tools
  win.webContents.openDevTools();

  // handle window close
  win.on("closed", () => {
    // clear the window from storage to allow GC to tidy up
    win = null;
  });
});

app.on("window-all-closed", () => {
  // all windows closed, quit if not macOS
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  // create new window if not present
  if (!win) createWindow();
});

// setup macOS menubar
if (process.platform === "darwin") {
  var template = [
    {
      label: "Shuffle",
      submenu: [{ label: "Quit", accelerator: "CmdOrCtrl+Q", click: app.quit }]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    }
  ];
  var osxMenu = menu.buildFromTemplate(template);
  menu.setApplicationMenu(osxMenu);
}

/*
 * TODO: implement own window state management
 */