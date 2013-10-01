(function (root) {
  var AG = root.AG = (root.AG || {});

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

})(this);