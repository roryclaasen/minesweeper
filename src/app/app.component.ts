import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Minesweeper';

	constructor(private _electronService: ElectronService) { }

	openGithub(): void {
		if (this._electronService.isElectronApp) {
			this._electronService.shell.openExternal('http://github.com/roryclaasen/minesweeper');
		} else {
			console.log('App is not an Electron App');
		}
	}
}
