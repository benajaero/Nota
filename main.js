const app = require('electron').app
const ipcMain = require('electron').ipcMain

app.on('ready', () => {
    
})

app.on('window-all-closed', () => {
    app.quit()
})
