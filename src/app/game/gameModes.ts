export class GameModeManager {

	private _list: GameMode[];
	private _custom: GameMode;

	private _current: number;

	constructor() {
		this._list = new Array<GameMode>();
		this._list[0] = new GameMode(9, 9, 10, GameModeType.defined, 'Easy');
		this._list[1] = new GameMode(16, 16, 40, GameModeType.defined, 'Medium');
		this._list[2] = new GameMode(24, 30, 100, GameModeType.defined, 'Hard');
		this._custom = new GameMode(30, 16, 150, GameModeType.custom, 'Custom');

		this._current = 1;
	}

	set current(index: number) {
		this._current = index;
	}

	get current(): number {
		return this._current;
	}

	get currentMode(): GameMode {
		if (this.isCustomMode) {
			return this._custom;
		}
		return this._list[this._current];
	}

	get list(): GameMode[] {
		return this._list;
	}

	get customMode(): GameMode {
		return this._custom;
	}

	get isCustomMode(): Boolean {
		return this._current === -1;
	}
}

export class GameMode {
	private _width: number;
	private _height: number;
	private _mines: number;
	private _type: GameModeType;

	private _desc: String;

	constructor(width: number, height: number, mines: number, type: GameModeType, description: String) {
		this._width = width;
		this._height = height;
		this._mines = mines;
		this._type = type;
		this._desc = description;
	}

	set width(width: number) {
		this._width = width;
	}

	get width(): number {
		return this._width;
	}

	set height(height: number) {
		this._height = height;
	}

	get height(): number {
		return this._height;
	}

	set mines(mines: number) {
		this._mines = mines;
	}

	get mines(): number {
		return this._mines;
	}

	get type(): GameModeType {
		return this._type;
	}

	get descSize(): String {
		return this._desc + ' (' + this._width + 'x' + this._height + ')';
	}

	get desc(): String {
		return this._desc;
	}
}

enum GameModeType {
	custom, defined
}
