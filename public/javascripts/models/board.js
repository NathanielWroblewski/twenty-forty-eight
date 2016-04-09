namespace('Game.Models')

var EMPTY = 0;

var ROTATIONS = {
	left:  0,
	down:  1,
	right: 2,
	up:    3,
	total: 4
};

Game.Models.Board = function (config) {
	this.height = config.height
	this.width  = config.width
	this.total  = config.height * config.width
	this.over   = false
	this.model  = config.model

	this.initialize = function () {
		this.tiles = []

		for (var i = 0; i < this.total; i++) {
			this.tiles.push(new this.model({
				value: EMPTY
			}))
		}
	}

	this.getEmptyTiles = function () {
		var emptyIndicies = []

		for (var i = 0; i < this.total; i++) {
			if (this.tiles[i].value === EMPTY) {
				emptyIndicies.push(i)
			}
		}
		return emptyIndicies
	}

	this.resetNewness = function () {
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].isNew = false
		}
	}

	this.resetMerged = function () {
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].wasMerged = false
		}
	}

	this.placeTile = function () {
		var empties = this.getEmptyTiles(),
			  random  = Math.floor(Math.random() * empties.length),
			  randomEmptyIndex = empties[random]

		if (empties.length) {
			this.resetNewness()
			return this.tiles[randomEmptyIndex].placeTile()
		} else {
			this.over = true
			alert('Game over')
		}
	}

	this.swap = function (index) {
		this.tiles[index - 1].value = this.tiles[index].value
		this.tiles[index].value = EMPTY
	}

	this.isWall = function (index) {
		return index % this.width === 0
	}

	this.slideAll = function () {
		for (var i = 0; i < this.total; i++) {
			if (!!this.tiles[i].value) {
				this.slide(i)
			}
		}
	}

	this.slide = function (index) {
		for (index; !this.isWall(index) && !this.tiles[index - 1].value; index--) {
		  this.swap(index)
		}

		if (!this.isWall(index) && this.tiles[index - 1].value === this.tiles[index].value && !this.tiles[index - 1].wasMerged) {
			this.merge(index)
		}
	}

	this.rotate = function () {
		var rotated = []

		for (var i = 0; i < this.width; i++) {
			rotated = rotated.concat(this.transpose(i).reverse())
		}
		this.tiles = rotated
	}

	this.transpose = function (columnTop) {
		var row = []

		for (var i = columnTop; i < this.total; i += this.width) {
			row.push(this.tiles[i])
		}
		return row
	}

	this.rotateTimes = function (times) {
		for (var i = times; i > 0; i--) {
			this.rotate()
		}
	}

	this.merge = function (index) {
		this.tiles[index - 1].value = this.tiles[index - 1].value + this.tiles[index].value
		this.tiles[index].value = EMPTY
		this.tiles[index - 1].wasMerged = true
	}

	this.move = function (direction) {
		if (!this.over) {
		  this.rotateTimes(ROTATIONS[direction])
		  this.slideAll()
		  this.rotateTimes((ROTATIONS.total - ROTATIONS[direction]) % ROTATIONS.total)
		  this.placeTile()
		  this.trigger('change')
		  this.resetMerged()
		}
	}

	this.toJSON = function () {
		var jsonTiles = []

		for (var i = 0; i < this.tiles.length; i++) {
			jsonTiles.push(this.tiles[i].toJSON())
		}

		return {
			tiles: jsonTiles
		}
	}

	this._on = {
		change: null
	}

	this.trigger = function (event) {
		this._on[event]()
	}

	this.on = function (event, callback) {
		this._on[event] = callback
	}

	this.initialize()
}
