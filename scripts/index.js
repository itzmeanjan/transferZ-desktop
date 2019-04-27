'use strict';
const { ipcRenderer } = require('electron');
window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.on('sendEvent', (event) => {

    });
    ipcRenderer.on('receiveEvent', (event) => {

    });
    document.getElementById('sendButton').addEventListener('click', (event) => {
        ipcRenderer.send('sendEvent', 'send');
    });
    document.getElementById('receiveButton').addEventListener('click', (event) => {
        ipcRenderer.send('receiveEvent', 'receive');
    });
});