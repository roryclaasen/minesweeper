import { Component, OnInit } from '@angular/core';

import { MineField, CellType } from './grid';

import { GameModeManager } from './gameModes';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval'; import 'rxjs/add/operator/takeWhile';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

	private mineField: MineField;

	private died: Boolean = false;
	private running: Boolean = false;
	private currentGameOptions: any;

	private _time: number;

	gameModes: GameModeManager;

	ngOnInit(): void {
		this.gameModes = new GameModeManager();
		this.newGame();

		Observable.interval(1000).takeWhile(() => this.running && !this.gameover).subscribe(i => {
			this._time += 1;
		});
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
		this._time = 0;
		this.running = false;
	}

	rightClick(event: any): void {
		event.preventDefault();
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (!this.mineField.table[y][x].revealed && !this.mineField.table[y][x].isDummy) {
				this.mineField.table[y][x].toggleFlag();
			}
		}
	}

	click(event: any): void {
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (this.mineField.table[y][x].isDummy) {
				this.running = true;
				this.mineField.generate(y, x);
			}
			if (this.mineField.table[y][x].hasFlag) {
				this.mineField.table[y][x].toggleFlag();
			} else {
				this.mineField.table[y][x].click();
				if (this.mineField.table[y][x].type === CellType.NONE) {
					this.mineField.revealEmpty(y, x);
				}
				if (this.mineField.table[y][x].hasMine) {
					this.mineField.revealMines();
					this.died = true;
				}
			}
		}
	}

	revealAll(): void {
		this.mineField.revealAll();
	}

	get gameover(): Boolean {
		return this.died;
	}

	get score(): number {
		return this.mineField.mines - this.mineField.flags;
	}

	get timer(): number {
		return this._time;
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
