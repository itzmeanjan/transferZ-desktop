'use strict';
const { app, BrowserWindow, ipcMain } = require('electron');

let myWindow;

function createHomePage() {
    myWindow = new BrowserWindow(
        {
            width: 800,
            height: 450,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
            }
        }
    );
    myWindow.on('closed', () => {
        myWindow = null;
    });
    myWindow.loadFile('pages/index.html');
}

app.on('ready', (launchInfo) => {
    createHomePage();
});

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('sendEvent', (event) => {
    console.log('send');
});

ipcMain.on('receiveEvent', (event) => {
    console.log('receive');
});