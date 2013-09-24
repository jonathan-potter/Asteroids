(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.DIM_X = 600;
  Asteroids.DIM_Y = 600;

  var Game = Asteroids.Game = function (canvasEl){
    this.ctx = canvasEl.getContext("2d");
    this.asteroids = [];
    this.DIM_X = Asteroids.DIM_X;
    this.DIM_Y = Asteroids.DIM_Y;
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y) )
    }
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    this.ship.draw(this.ctx);
  }

  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
    this.ship.move();
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();
  }

  Game.prototype.start = function() {
    var game = this;
    this.ship = Asteroids.Ship.createShip();
    this.addAsteroids(10);
    window.setInterval(game.step.bind(game), 16);
  }

})(this);