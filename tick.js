(function (root) {
  var AG = root.AG = (root.AG || {});

  var Tick = AG.Tick = {}

  Tick.lastFrameTime        = 0;  // time since last frame
  Tick.lastFPSUpdateTime    = 0;  // time since last fps screen update
  Tick.fps                  = 0;  // frames per second

  ////////////////////////////// TRACK TIME ////////////////////////////////

  Tick.currentFrameTime = function () {
    return (new Date()).getTime();
  }

  Tick.timeSinceLastTick = function () {
    return Tick.currentFrameTime() - Tick.lastFrameTime;
  }

  ////////////////////////////// COLLISIONS /////////////////////////////////

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

  ////////////////////////////// DRAW SCORE AND FPS /////////////////////////

  Tick.updateScoreboard = function (ctx, score) {
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.font = "bold 16px Arial";
    ctx.fillText(score, AG.DIM_X - 5, 5);
  }

  Tick.updateFramesPerSecond = function (ctx) {
    if (Tick.currentFrameTime() - Tick.lastFPSUpdateTime > 50) {
      Tick.lastFPSUpdateTime = Tick.currentFrameTime();

      // convert time in ms to fps
      Tick.fps = Math.floor(1000/Tick.timeSinceLastTick());
    }

    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.font = "bold 16px Arial";
    ctx.fillText(Tick.fps, AG.DIM_X - 5, 30);
  }

})(this);