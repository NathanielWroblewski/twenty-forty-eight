namespace('Game.Views')

Game.Views.Board = function (config) {
	this.el = config.el
	this.collection = config.model

	this.initialize = function () {
		this.setListeners()
	}

	this.setListeners = function () {
		this.collection.on('change', this.render.bind(this))

		document.onkeyup = function (e) {
    	switch (e.keyCode) {
    		case 37:
    		  return this.collection.move('left')
    		case 38:
    		  return this.collection.move('up')
    		case 39:
    		  return this.collection.move('right')
    		case 40:
    		  return this.collection.move('down')
    	}
    }.bind(this)
	}

	this.template = function (collection) {
		var html = ''

		for (var i = 0; i < collection.tiles.length; i++) {
			var tile = collection.tiles[i],
          newClass = tile.isNew ? 'new' : '',
          emptyClass = tile.value ? '' : 'empty',
          tileValue = tile.value ? tile.value : '',
          mergeClass = tile.wasMerged ? 'merged' : '',
          colorClass = 'tile-' + tileValue,
          classes = ['tile', newClass, emptyClass, mergeClass, colorClass].join(' ')

			html += '<div class="' + classes + '">' + tileValue + '</div>'
		}
		return html
	}

	this.render = function () {
		this.el.innerHTML = this.template(this.collection.toJSON())
	}

	this.initialize()
}
