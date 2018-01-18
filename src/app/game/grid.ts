export class MineField {
	private _width: number;
	private _height: number;

	private _table: FieldCell[][];

	constructor(width: number, height: number, mines: number) {
		this._width = width;
		this._height = height;

		this._table = [];
		for (let y = 0; y < height; y++) {
			this._table[y] = new Array<FieldCell>(width);
		}

		for (let m = 0; m < mines; m++) {
			let y: number = Math.floor(Math.random() * height);
			let x: number = Math.floor(Math.random() * width);
			while (this._table[y][x] !== undefined) {
				y = Math.floor(Math.random() * height);
				x = Math.floor(Math.random() * width);
			}
			this._table[y][x] = new FieldCell(CellType.MINE);
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let count = 0;
				if (this._table[y][x] !== undefined) {
					continue;
				}
				for (let yI = -1; yI <= 1; yI++) {
					if (y + yI < 0 || y + yI >= height) { continue; }
					for (let xI = -1; xI <= 1; xI++) {
						if (x + xI < 0 || x + xI >= width) { continue; }
						if (yI === y && xI === x) {
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

	get table(): FieldCell[][] {
		return this._table;
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._width;
	}
}

export class FieldCell {
	private _type: CellType;
	private _number: number;
	private _flag: Boolean;
	private _revealed: Boolean;

	constructor(type: CellType, number?: number) {
		this._type = type;
		this._number = number;
		this._flag = false;
		this._revealed = false;
	}

	get number(): number {
		return this._number;
	}

	reveal(): void {
		this._revealed = true;
	}

	get revealed(): Boolean {
		return this._revealed;
	}

	toggleFlag(): void {
		this._flag = !this._flag;
	}

	get hasFlag(): Boolean {
		return this._flag;
	}

	get hasMine(): Boolean {
		return this._revealed && this._type === CellType.MINE;
	}

	get type(): CellType {
		return this._type;
	}
}

export enum CellType {
	NONE, NUMBER, MINE
}
