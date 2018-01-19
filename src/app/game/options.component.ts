import { Component, Input } from '@angular/core';

import { GameModeManager } from './gameModes';
@Component({
	selector: 'app-game-options',
	templateUrl: './options.component.html',
	styleUrls: []
})
export class GameOptionsComponent {

	@Input() gameModes: GameModeManager;

	constructor() {
		this.selectedMode = 2;
	}

	set selectedMode(index: number) {
		this.gameModes.setCurrentMode(index);
	}

	get selectedMode(): number {
		return this.gameModes.currentNumber;
	}
}

