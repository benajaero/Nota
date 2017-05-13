const path = require('path')
const url = require('url')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const globalShortcut = electron.globalShortcut
var mkdirp = require('mkdirp')

mkdirp(path.join(__dirname, 'notae'), err => {
    if (err) throw err
    
})

let win

function makeWin() {
    win = new BrowserWindow({width: 1024, height: 512})
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }))
    win.setMenu(null)
    win.webContents.openDevTools()
    
    win.on('closed', () => {
        win = null
    })
    
    globalShortcut.register('CommandOrControl+S', () => {
        win.webContents.send('save')
    })
}

app.on('ready', makeWin)





app.on('window-all-closed', () => {
    app.quit()
})
