!function () {
	var board = new Game.Models.Board({
		height: 4,
		width:  4,
		model:  Game.Models.Tile
	})

	board.placeTile()
	board.placeTile()

	var view = new Game.Views.Board({
		model: board,
		el:    document.querySelector('.board')
	})

	view.render()
}()
