import { Component, Input } from '@angular/core';

import { GameModeManager } from './gameModes';

@Component({
	selector: 'app-game-options',
	templateUrl: './options.component.html',
	styleUrls: []
})
export class GameOptionsComponent {

	@Input() gameModes: GameModeManager;
}

