(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.DIM_X = 600;
  Asteroids.DIM_Y = 600;

  var Game = Asteroids.Game = function (canvasEl){
    this.ctx = canvasEl.getContext("2d");
    this.asteroids = [];    //
    // this.DIM_X = Asteroids.DIM_X;
    // this.DIM_Y = Asteroids.DIM_Y;
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Asteroids.DIM_X, Asteroids.DIM_Y) )
    }
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
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
    if (this.checkCollisions()) {
      this.stop();
    }
    this.removeOutOfBounds();

  }

  Game.prototype.removeOutOfBounds = function (){
    console.log(this.asteroids.length);
    var newAsteroidsArray = []
    for (var i = 0; i < this.asteroids.length; i++) {
      if ( !this.asteroids[i].outOfBounds() ) {
        newAsteroidsArray.push(this.asteroids[i])
      }
    }

    this.asteroids = newAsteroidsArray;
  }

  Game.prototype.start = function() {
    var game = this;
    this.ship = Asteroids.Ship.createShip();
    this.addAsteroids(10);
    this.bindKeyHandlers()
    this.intervalId = window.setInterval(game.step.bind(game), 16);
  }

  Game.prototype.stop = function () {
    window.clearInterval(this.intervalId)
  }

  Game.prototype.bindKeyHandlers = function () {
    // key('a', function(){ alert('you pressed a!') });
  }

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        return true
      }
    }
    return false;
  }

})(this);