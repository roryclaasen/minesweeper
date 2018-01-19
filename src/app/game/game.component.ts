import { Component, OnInit} from '@angular/core';

import { MineField, CellType } from './grid';

import { GameModeManager } from './gameModes';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

	private mineField: MineField;

	private died: Boolean = false;

	private currentGameOptions: any;

	gameModes: GameModeManager;

	ngOnInit(): void {
		this.gameModes = new GameModeManager();
	}

	constructor() {
		this.newGame();
	}

	gameOptionsChanged(options: any): void {
		this.currentGameOptions = options;
	}

	newGame(): void {
		this.died = false;
		const width = this.gameModes.currentMode.width;
		const height = this.gameModes.currentMode.height;
		const mines = this.gameModes.currentMode.mines;
		this.mineField = new MineField(width, height, mines);
	}

	rightClick(event: any): void {
		event.preventDefault();
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (!this.mineField.table[y][x].revealed) {
				this.mineField.table[y][x].toggleFlag();
			}
		}
	}

	click(event: any): void {
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (this.mineField.table[y][x].hasFlag) {
				this.mineField.table[y][x].toggleFlag();
			} else {
				this.mineField.table[y][x].reveal();
				if (this.mineField.table[y][x].type === CellType.NONE) {
					this.revealEmpty(y, x);
				}
				if (this.mineField.table[y][x].hasMine) {
					// this.died = true;
				}
			}
		}
	}

	private revealEmpty(startY: number, startX: number) {
		for (let yI = -1; yI <= 1; yI++) {
			const y = startY + yI;
			if (y < 0 || y >= this.mineField.height) { continue; }
			for (let xI = -1; xI <= 1; xI++) {
				if ((yI === -1 || yI === 1) && (xI === -1 || xI === 1)) { continue; }
				const x = startX + xI;
				if (x < 0 || x >= this.mineField.width) { continue; }
				if (y === startY && x === startX) { continue; }
				if (this.mineField.table[y][x].type === CellType.NONE && !this.mineField.table[y][x].revealed) {
					this.mineField.table[y][x].reveal();
					this.revealEmpty(y, x);
				}
			}
		}
	}

	get gameover(): Boolean {
		return this.died;
	}

	convertNumber(value: number): String {
		switch (value) {
			case (1): {
				return 'one';
			}
			case (2): {
				return 'two';
			}
			case (3): {
				return 'three';
			}
			case (4): {
				return 'four';
			}
			case (5): {
				return 'five';
			}
			case (6): {
				return 'siz';
			}
			case (7): {
				return 'seven';
			}
			case (8): {
				return 'eight';
			}
			default: {
				return '';
			}
		}
	}
}
