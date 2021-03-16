const { ipcRenderer } = require('electron');
const { h, Component, render } = require('preact');
const htm = require('htm');

const html = htm.bind(h);

ipcRenderer.on('openFile', (event, file, content) => {
    console.log(file, content);
  });