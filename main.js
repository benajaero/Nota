const path = require('path')
const url = require('url')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain


let win

function makeWin() {
    win = new BrowserWindow({width: 1024, height: 720})
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }))
    
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', makeWin)






app.on('window-all-closed', () => {
    app.quit()
})
