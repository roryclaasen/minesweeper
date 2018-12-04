export enum CellType {
	NONE, NUMBER, MINE, DUMMY
}

export class FieldCell {
	private _type: CellType;
	private _number: number;
	private _flag: Boolean;
	private _question: Boolean;
	private _revealed: Boolean;
	private _used: Boolean;

	constructor(type: CellType, number?: number) {
		this._type = type;
		this._number = number;
		this._flag = false;
		this._question = false;
		this._revealed = false;
		this._used = false;
	}

	get number(): number {
		return this._number;
	}

	click(): void {
		this._used = true;
		this.reveal();
	}

	reveal(): void {
		if (!this.isDummy) {
			this._revealed = true;
			// this._flag = false;
			this._question = false;
		}
	}

	get revealed(): Boolean {
		return this._revealed;
	}

	get used(): Boolean {
		return this._used;
	}

	toggleFlag(): void {
		if (this._question) {
			this._question = false;
			return;
		}
		if (this._flag) {
			this._flag = false;
			this._question = true;
			return;
		}
		if (!this._question && !this._flag) {
			this._flag = true;
			return;
		}
	}

	get hasFlag(): Boolean {
		return this._flag;
	}

	get hasQuestion(): Boolean {
		return this._question;
	}

	get hasMine(): Boolean {
		return this._revealed && this._type === CellType.MINE;
	}

	get isMine(): Boolean {
		return this._type === CellType.MINE;
	}

	get isDummy(): Boolean {
		return this._type === CellType.DUMMY;
	}

	get type(): CellType {
		return this._type;
	}
}

export class MineField {
	private _width: number;
	private _height: number;
	private _mines: number;

	private _table: FieldCell[][];

	constructor(width: number, height: number, mines: number, placeX?: number, placeY?: number) {
		this._width = width;
		this._height = height;
		this._mines = Math.min(mines, width * height);

		this._table = [];
		const dummy = new FieldCell(CellType.DUMMY);

		for (let y = 0; y < height; y++) {
			this._table[y] = new Array<FieldCell>(width);
			for (let x = 0; x < width; x++) {
				this._table[y][x] = dummy;
			}
		}
	}

	generate(placeY?: number, placeX?: number): void {
		this._table = [];
		for (let y = 0; y < this._height; y++) {
			this._table[y] = new Array<FieldCell>(this._width);
		}
		for (let m = 0; m < this._mines; m++) {
			let y: number = placeY;
			let x: number = placeX;

			while ((y === placeY && x === placeX) || this._table[y][x] !== undefined) {
				y = Math.floor(Math.random() * this._height);
				x = Math.floor(Math.random() * this._width);
			}
			this._table[y][x] = new FieldCell(CellType.MINE);
		}

		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				let count = 0;
				if (this._table[y][x] !== undefined) {
					continue;
				}
				for (let yI = -1; yI <= 1; yI++) {
					if (y + yI < 0 || y + yI >= this._height) { continue; }
					for (let xI = -1; xI <= 1; xI++) {
						if (x + xI < 0 || x + xI >= this._width) { continue; }
						if (y + yI === y && x + xI === x) {
							continue;
						}
						const cell = this._table[y + yI][x + xI];
						if (cell !== undefined) {
							if (cell.type === CellType.MINE) {
								count++;
							}
						}
					}
				}
				if (count === 0) {
					this._table[y][x] = new FieldCell(CellType.NONE);
				} else {
					this._table[y][x] = new FieldCell(CellType.NUMBER, count);
				}
			}
		}
	}

	revealAll(): void {
		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				if (!this._table[y][x].hasFlag) {
					this._table[y][x].reveal();
				}
			}
		}
	}

	revealMines(): void {
		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				if (this._table[y][x].isMine) {
					this._table[y][x].reveal();
				}
			}
		}
	}

	revealEmpty(startY: number, startX: number): void {
		for (let yI = -1; yI <= 1; yI++) {
			const y = startY + yI;
			if (y < 0 || y >= this._height) { continue; }
			for (let xI = -1; xI <= 1; xI++) {
				if ((yI === -1 || yI === 1) && (xI === -1 || xI === 1)) { continue; }
				const x = startX + xI;
				if (x < 0 || x >= this._width) { continue; }
				if (y === startY && x === startX) { continue; }
				if (!this._table[y][x].revealed) {
					this._table[y][x].reveal();
					if (this._table[y][x].type === CellType.NONE) {
						this.revealEmpty(y, x);
					}
				}
			}
		}
	}

	get table(): FieldCell[][] {
		return this._table;
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	get mines(): number {
		return this._mines;
	}

	get flags(): number {
		let count = 0;
		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				if (this._table[y][x].revealed) {
					continue;
				}
				if (this._table[y][x].hasFlag) {
					count++;
				}
			}
		}
		return count;
	}

	get movesLeft(): number {
		let count = 0;
		for (let y = 0; y < this._height; y++) {
			for (let x = 0; x < this._width; x++) {
				if (this._table[y][x].revealed) {
					continue;
				}
				if (this._table[y][x].isMine && this._table[y][x].hasFlag) {
					continue;
				}
				count++;
			}
		}
		return count;
	}
}

