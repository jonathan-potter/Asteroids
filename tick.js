(function (root) {
  var AG = root.AG = (root.AG || {});

  AG.lastUpdate = 0;  // frames per second update timer
  AG.fps        = 0;  // initial frames per second

  var Tick = AG.Tick = {}

  Tick.checkCollisions = function (game) {
    for (var i = 0; i < game.asteroids.length; i++) {
      if (game.ship.isCollidedWith(game.asteroids[i])) {
        return true
      }
    }

    return false;
  }

  Tick.detectBulletAsteroidCollisions = function (game) {
    var asteroidsToRemove = []
    var bulletsToRemove = []
    for (var bullet_index = 0; bullet_index < game.bullets.length; bullet_index++) {
      for (var ast_index = 0; ast_index < game.asteroids.length; ast_index++) {
        if ( game.bullets[bullet_index].isCollidedWith(game.asteroids[ast_index]) ) {
          asteroidsToRemove.push(ast_index);
          bulletsToRemove.push(bullet_index);
        }
      }
    }

    return [asteroidsToRemove, bulletsToRemove]
  }

  Tick.removeCollidingAsteroids = function (game, asteroidsToRemove) {
    var newAsteroidsArray = []
    for (var i = 0; i < game.asteroids.length; i++ ) {
      if (asteroidsToRemove.indexOf(i) === -1) {
        newAsteroidsArray.push(game.asteroids[i]);
      } else {
        newAsteroidsArray = newAsteroidsArray.concat(game.asteroids[i].makeShards())
      }
    }
    game.asteroids = newAsteroidsArray;
  }

  Tick.removeCollidingBullets = function (game, bulletsToRemove) {
    var newBulletsArray = []
    for (var i = 0; i < game.bullets.length; i++ ) {
      if (bulletsToRemove.indexOf(i) === -1) {
        newBulletsArray.push(game.bullets[i]);
      }
    }

    game.bullets = newBulletsArray;
  }

  Tick.updateScoreboard = function (ctx, score) {
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.font = "bold 16px Arial";
    ctx.fillText(score, AG.DIM_X - 5, 5);
  }

  Tick.updateFramesPerSecond = function (ctx) {
    var date = new Date();
    var currentTime = date.getTime();
    var frameTime = currentTime - AG.lastTime;
    AG.lastTime = currentTime;

    if (currentTime - AG.lastUpdate > 50) {
      AG.lastUpdate = currentTime;

      // convert time in ms to fps
      AG.fps = Math.floor(1000/frameTime);
    }

    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.font = "bold 16px Arial";
    ctx.fillText(AG.fps, AG.DIM_X - 5, 30);
  }

})(this);