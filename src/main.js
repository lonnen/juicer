const { app, BrowserWindow, dialog, Menu } = require('electron');
const fs = require('fs');
const windowStateKeeper = require('electron-window-state');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let browserWindow = null;

const createWindow = () => {
  // Create the browser window.
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  browserWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    }
  });

  browserWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindowState.manage(browserWindow);
};

// build the application menu items
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        accelerator: 'Shift+CommandOrControl+O',
        async click() {
          const { cancelled, filePaths } = await dialog.showOpenDialog({
            title: 'Open File',
            buttonLabel: 'Open',
            properties: ['openFile'],
            filters: [
              { name: 'Player Game Notation Files', extensions: ['pgn'] }
            ]
          });
          if (!cancelled && filePaths.length > 0) {
              const file = filePaths[0];
              const content = fs.readFileSync(file).toString();
              browserWindow.webContents.send('openFile', file, content);
          }
        }
      },
      { type: 'separator' },
      {
        label: 'Save File',
        accelerator: "CommandOrControl+S",
        async click() {
          console.log('unimplemented');
        }
      },
      {
        label: 'Save As...',
        accelerator: "Shift+CommandOrControl+S",
        async click() {
          console.log('unimplemented');
        }
      },
      { type: 'separator' },
      { role: 'close' },
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          shell.openExternal('https://github.com/Lonnen/juicer');
        },
      },
    ],
  },
];

if (process.platform === 'darwin') {

  template.unshift({
    label: 'Juicer',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      // { type: 'preferences' },
      // { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  });

  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    {
      label: 'Main Window',
      accelerator: 'cmd+1',
      click() {
        if (browserWindow) {
          browserWindow.focus();
        } else {
          createWindow();
        }
      },
    },
  ];
} else {
  template[0].submenu.push({ role: 'quit' });
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
// END menu items

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});