(function (root) {
  var AG = root.AG = (root.AG || {});

  var tickRate = 16;
  var spawnLimit = 300;

  var Game = AG.Game = function (canvasEl, width, height){
    AG.DIM_X = width;
    AG.DIM_Y = height;
    AG.game = this;

    this.ctx = canvasEl.getContext("2d");
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(AG.Asteroid.randomAsteroid(AG.DIM_X,
                                                     AG.DIM_Y,
                                                     AG.DIM_X / 30));
    }
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, AG.DIM_X, AG.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    for (var i = 0; i < this.bullets.length; i++){
      this.bullets[i].draw(this.ctx);
    }
    this.ship.draw(this.ctx);
    AG.Tick.updateScoreboard(this.ctx, this.score);
    AG.Tick.updateFramesPerSecond(this.ctx);
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

  Game.prototype.resetOutOfBoundsShip = function (){
    if (this.ship.outOfBounds()) {
      if (this.ship.pos[0] < 0) {
        this.ship.pos[0] += AG.DIM_X + this.ship.radius * 2
      }
      else if (this.ship.pos[0] > AG.DIM_X) {
        this.ship.pos[0] -= AG.DIM_X + this.ship.radius * 2
      }
      if (this.ship.pos[1] < 0) {
        this.ship.pos[1] += AG.DIM_Y + this.ship.radius * 2
      }
      else if (this.ship.pos[1] > AG.DIM_Y) {
        this.ship.pos[1] -= AG.DIM_Y + this.ship.radius * 2
      }

    }
  }

  Game.prototype.bindKeyHandlers = function () {
    key('space', function(){
      AG.game.fireBullet();
    });
  }

  Game.prototype.start = function() {
    var game = this;
    this.ship = AG.Ship.createShip();
    this.addAsteroids(4);
    this.bindKeyHandlers();
    this.intervalId = window.setInterval(game.step.bind(game), tickRate);
  }

  Game.prototype.stop = function () {
    window.clearInterval(this.intervalId)
  }

  Game.prototype.step = function() {
    this.move();
    this.draw();
    if (AG.Tick.checkCollisions(AG.game)) {
      // this.stop();
    }
    this.removeOutOfBounds();
    collisions = AG.Tick.detectBulletAsteroidCollisions(AG.game)
    asteroidsToRemove = collisions[0];
    // bulletsToRemove = collisions[1];
    AG.Tick.removeCollidingAsteroids(AG.game, asteroidsToRemove);
    // AG.Tick.removeCollidingBullets(AG.game, bulletsToRemove);
    this.addAsteroids(spawnLimit - this.asteroids.length)
    this.resetOutOfBoundsShip();
  }

})(this);