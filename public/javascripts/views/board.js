namespace('Game.Views')

Game.Views.Board = function (config) {
	this.el = config.el
	this.collection = config.model

	this.initialize = function () {
		this.setListeners()
	}

	this.setListeners = function () {
		this.collection.on('change', this.render.bind(this))
	}

	this.template = function (collection) {
		var html = ''

		for (var i = 0; i < collection.tiles.length; i++) {
			var tile = collection.tiles[i]

			if (tile) {
			  html += '<div class="tile">' + tile + '</div>'
			} else {
				html += '<div class="empty tile"></div>'
			}
		}
		return html
	}

	this.render = function () {
		this.el.innerHTML = this.template(this.collection.toJSON())
	}

	this.initialize()
}
