(function (root) {
  var AG = root.AG = (root.AG || {});

  var color = 'grey';
  var hitPoints = 5;

  var Asteroid = AG.Asteroid = function (pos, vel, radius, hit_points){
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.radius = radius;
    this.objectType = "Asteroid";
    this.hitPoints = hit_points;
    this.shardCount = 3;
  }

  Asteroid.inherits(AG.MovingObject);

  Asteroid.randomAsteroid = function (dimX, dimY, radius) {

    var xy = Math.floor(Math.random() * 2); // coming from x or y
    var pn = Math.floor(Math.random() * 2); // coming from positive or negative

    var x;
    var y;

    if (xy == 0) {  // x
      if (pn == 0) {
        x = -radius;
      } else {
        x = AG.DIM_X + radius;
      }
      y = Math.random() * AG.DIM_Y;
    } else {        // y
      x = Math.random() * AG.DIM_X;
      if (pn == 0) {
        y = -radius;
      } else {
        y = AG.DIM_Y + radius;
      }
    }

    // var x = Math.floor(Math.random() * dimX);
    //     var y = Math.floor(Math.random() * dimY);
    var dx = Math.random() * 2 - 1;
    var dy = Math.random() * 2 - 1;

    var newAsteroid = new Asteroid([x, y], [dx, dy], radius, hitPoints);
    return newAsteroid;
  }

  Asteroid.createAsteroid = function (pos, vel, radius, hit_points) {
    return new Asteroid(pos, vel, radius, hit_points);
  }

  Asteroid.prototype.makeShards = function () {
    var shards = [];
    if (this.hitPoints > 0) {
      direction = Math.random() * 2 * Math.PI;

      for (var i = 0; i < this.shardCount; i++) {
        angleOffset = i * 2 / 3 * Math.PI;

        dx = Math.cos(direction + angleOffset);
        dy = Math.sin(direction + angleOffset);

        vel = [dx, dy];

        var newAsteroid = Asteroid.createAsteroid(this.pos.slice(),
                                                  vel,
                                                  this.radius / 2,
                                                  this.hitPoints - 1);
        shards.push(newAsteroid);
      }
    }

    return shards;
  }

})(this);