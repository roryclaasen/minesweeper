// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

var serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

if (serve) {
	require('electron-reload')(__dirname, {
		electron: require('electron-prebuilt')
	});
}

var win = null;

function createWindow() {
	win = new BrowserWindow({ width: 1000, height: 650 });

	if (!serve) {
		win.setMenu(null);
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'dist', 'index.html'),
			protocol: 'file:',
			slashes: true
		}));
	} else {
		win.loadURL('http://localhost:4200');
		win.webContents.openDevTools();
	}

	win.on('closed', function () {
		win = null;
	});
}


try {
	app.on('ready', createWindow);

	app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') app.quit();
	});

	app.on('activate', function () {
		if (win === null) createWindow();
	});
} catch (e) { 
	throw e;
}