// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

require('dotenv').config();
try {
	require('electron-reload')(__dirname, {
		electron: require('electron-prebuilt')
	});
} catch (error) { }

let win = null;

function createWindow() {
	win = new BrowserWindow({ width: 1000, height: 600 });


	if (process.env.PACKAGE === 'true') {
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'dist', 'index.html'),
			protocol: 'file:',
			slashes: true
		}));
		win.setMenu(null);
	} else {
		win.loadURL(process.env.HOST);
		win.webContents.openDevTools();
	}

	win.on('closed', function () {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
	if (win === null) createWindow();
});
