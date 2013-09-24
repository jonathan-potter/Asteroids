(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  function Game(ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.DIM_X = 600;
    this.DIM_Y = 600;
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asterdoid.randomAsteroid(this.DIM_X, this.DIM_Y) )
    }
  }

  Game.prototype.draw = function () {
    ctx.clearRect();
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw();
    }
  }

  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();
  }

  Game.prototype.start = function() {
    window.setInterval(30,this.step);
  }

})(this);