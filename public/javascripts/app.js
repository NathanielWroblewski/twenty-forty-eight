!function () {
	var board = new Game.Models.Board({
		height: 4,
		width:  4
	})

	board.placeTile()

	var view = new Game.Views.Board({
		model: board,
		el:    document.querySelector('.board')
	})

	view.render()

	document.onkeyup = function (e) {
		switch (e.keyCode) {
			case 37:
			  return board.move('left')
			case 38:
			  return board.move('up')
			case 39:
			  return board.move('right')
			case 40:
			  return board.move('down')
		}
	}
}()
