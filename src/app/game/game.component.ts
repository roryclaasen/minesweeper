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
	private won: Boolean = false;
	private running: Boolean = false;
	private currentGameOptions: any;

	private _time: number;
	private _minesLft: number;

	gameModes: GameModeManager;

	ngOnInit(): void {
		this.gameModes = new GameModeManager();
		this.newGame();
	}

	gameOptionsChanged(options: any): void {
		this.currentGameOptions = options;
	}

	newGame(): void {
		this.died = this.won = false;
		const width = this.gameModes.currentMode.width;
		const height = this.gameModes.currentMode.height;
		const mines = this.gameModes.currentMode.mines;

		this.mineField = new MineField(width, height, mines);
		this._time = this._minesLft = 0;
		this.running = false;
	}

	rightClick(event: any): void {
		event.preventDefault();
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (!this.mineField.table[y][x].revealed && !this.mineField.table[y][x].isDummy) {
				this.mineField.table[y][x].toggleFlag();
			}
			this.checkHasEnded();
		}
	}

	click(event: any): void {
		this.running = true;
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (this.mineField.table[y][x].isDummy) {
				Observable.interval(1000).takeWhile(() => this.doTick).subscribe(i => {
					this._time += 1;
				});
				this.mineField.generate(y, x);
			}
			if (this.mineField.table[y][x].hasFlag || this.mineField.table[y][x].hasQuestion) {
				this.mineField.table[y][x].toggleFlag();
			} else {
				this.mineField.table[y][x].click();
				if (this.mineField.table[y][x].type === CellType.NONE) {
					this.mineField.revealEmpty(y, x);
				}
				if (this.mineField.table[y][x].hasMine) {
					this._minesLft = this.score;
					this.mineField.revealMines();
					this.died = true;
				}
			}
			this.checkHasEnded();
		}
	}

	showFlag(hasFlag: Boolean, hasMine: Boolean) {
		if (this.gameover) {
			return hasFlag && !hasMine;
		}
		return hasFlag;
	}

	revealAll(): void {
		this.mineField.revealAll();
	}

	checkHasEnded(): Boolean {
		if (this.mineField.movesLeft === 0) {
			this.won = true;
		}
		return this.won;
	}

	get gameover(): Boolean {
		return this.died || this.won;
	}

	get score(): number {
		if (this.died) {
			return this._minesLft;
		}
		return this.mineField.mines - this.mineField.flags;
	}

	get timer(): number {
		return this._time;
	}

	private get doTick(): boolean {
		return this.running && !this.gameover;
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
