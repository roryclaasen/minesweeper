import { Component, OnInit } from '@angular/core';

import { MineField, CellType } from './grid';

import { GameModeManager } from './gameModes';

import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

	private _mineField: MineField;

	private _died: Boolean = false;
	private won: Boolean = false;
	private running: Boolean = false;
	private currentGameOptions: any;

	private _time: number;
	private _minesLft: number;

	gameModes: GameModeManager;

	private timerInterval: Subscription;

	ngOnInit(): void {
		this.gameModes = new GameModeManager();
		this.newGame();
	}

	gameOptionsChanged(options: any): void {
		this.currentGameOptions = options;
	}

	newGame(): void {
		this._died = this.won = false;
		const width = this.gameModes.currentMode.width;
		const height = this.gameModes.currentMode.height;
		const mines = this.gameModes.currentMode.mines;

		this._mineField = new MineField(width, height, mines);
		this._time = this._minesLft = 0;
		this.running = false;
	}

	rightClick(event: any): void {
		event.preventDefault();
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (!this._mineField.table[y][x].revealed && !this._mineField.table[y][x].isDummy) {
				this._mineField.table[y][x].toggleFlag();
			}
			this.checkHasEnded();
		}
	}

	click(event: any): void {
		this.running = true;
		if (!this.gameover) {
			const y: number = parseInt(event.target.attributes.y.value, 10), x: number = parseInt(event.target.attributes.x.value, 10);
			if (this._mineField.table[y][x].isDummy) {
				this.timerInterval = interval(1000).subscribe(i => {
					if (!this.gameover) {
						this._time += 1;
					}
				});
				this._mineField.generate(y, x);
			}
			if (this._mineField.table[y][x].hasFlag || this._mineField.table[y][x].hasQuestion) {
				this._mineField.table[y][x].toggleFlag();
			} else {
				this._mineField.table[y][x].click();
				if (this._mineField.table[y][x].type === CellType.NONE) {
					this._mineField.revealEmpty(y, x);
				}
				if (this._mineField.table[y][x].hasMine) {
					this._minesLft = this.score;
					this._mineField.revealMines();
					this._died = true;
					this.timerInterval.unsubscribe();
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
		this._mineField.revealAll();
		this.timerInterval.unsubscribe();
	}

	checkHasEnded(): Boolean {
		if (this._mineField.movesLeft === 0) {
			this.won = true;
		}
		return this.won;
	}

	get mineField(): MineField {
		return this._mineField;
	}

	get gameover(): Boolean {
		return this._died || this.won;
	}

	get died(): Boolean {
		return this._died;
	}

	get score(): number {
		if (this._died) {
			return this._minesLft;
		}
		return this._mineField.mines - this._mineField.flags;
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
