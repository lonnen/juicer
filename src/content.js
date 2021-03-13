const { ipcRenderer } = require('electron');

ipcRenderer.on('openFile', (event, file, content) => {
    console.log(file, content);
  });