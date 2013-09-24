(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.DIM_X = 600;
  Asteroids.DIM_Y = 600;

  var Game = Asteroids.Game = function (canvasEl){
    this.ctx = canvasEl.getContext("2d");
    this.asteroids = [];
    this.bullets = [];
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
    for (var i = 0; i < this.bullets.length; i++){
      this.bullets[i].draw(this.ctx);
    }
    this.ship.draw(this.ctx);
  }

  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
    for (var i = 0; i < this.bullets.length; i++){
      this.bullets[i].move();
    }
    this.ship.move();
  }

  Game.prototype.fireBullet = function () {
    var bullet = this.ship.fireBullet();

    this.bullets.push(bullet);
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();
    if (this.checkCollisions()) {
      this.stop();
    }
    this.removeOutOfBounds();
    this.removeCollidingBulletsAndAsteroids();
  }

  Game.prototype.removeOutOfBounds = function (){
    var newAsteroidsArray = []
    for (var i = 0; i < this.asteroids.length; i++) {
      if ( !this.asteroids[i].outOfBounds() ) {
        newAsteroidsArray.push(this.asteroids[i])
      }
    }
    var newBulletsArray = []
    for (var i = 0; i < this.bullets.length; i++) {
      if ( !this.bullets[i].outOfBounds() ) {
        newBulletsArray.push(this.bullets[i])
      }
    }

    this.bullets = newBulletsArray;
    this.asteroids = newAsteroidsArray;
  }

  Game.prototype.bindKeyHandlers = function () {
    var game = this;
    key('a', function(){ alert('you pressed a!') });
    key('space', function(){
      game.fireBullet();
     });
  }

  Game.prototype.start = function() {
    var game = this;
    this.ship = Asteroids.Ship.createShip();
    this.addAsteroids(10);
    this.bindKeyHandlers();
    this.intervalId = window.setInterval(game.step.bind(game), 16);
  }

  Game.prototype.stop = function () {
    window.clearInterval(this.intervalId)
  }

  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        return true
      }
    }
    return false;
  }

  Game.prototype.removeCollidingBulletsAndAsteroids = function() {
    var asteroidsToRemove = []
    var bulletsToRemove = []
    for (var bullet_index = 0; bullet_index < this.bullets.length; bullet_index++) {
      for (var ast_index = 0; ast_index < this.asteroids.length; ast_index++) {
        if ( this.bullets[bullet_index].isCollidedWith(this.asteroids[ast_index]) ) {
          asteroidsToRemove.push(ast_index);
          bulletsToRemove.push(bullet_index);
        }
      }
    }
    var newAsteroidsArray = []
    for (var i = 0; i < this.asteroids.length; i++ ) {
      if (asteroidsToRemove.indexOf(i) === -1) {
        newAsteroidsArray.push(this.asteroids[i]);
      }
    }
    var newBulletsArray = []
    for (var i = 0; i < this.bullets.length; i++ ) {
      if (bulletsToRemove.indexOf(i) === -1) {
        newBulletsArray.push(this.bullets[i]);
      }
    }
    this.asteroids = newAsteroidsArray;
    this.bullets = newBulletsArray;
  }

})(this);