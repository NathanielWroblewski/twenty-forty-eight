namespace('Game.Models')

Game.Models.Tile = function(config) {
  this.value     = config.value
  this.isNew     = false
  this.wasMerged = false

  this.placeTile = function () {
    this.value = 2
    this.isNew = true
  }

  this.toJSON = function() {
    return {
      value:     this.value,
      isNew:     this.isNew,
      wasMerged: this.wasMerged
    }
  }
}
