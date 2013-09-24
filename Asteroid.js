(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var COLOR = 'black';
  var RADIUS = 20;

  function Asteroid(pos, vel){
    this.pos = pos;
    this.vel = vel;

    MovingObject.call(this, pos, vel, RADIUS, COLOR);
  }

  Asteroid.inherits(MovingObject);

  // Asteroid.prototype = new MovingObject(, this.vel, RADIUS, COLOR)

  Asteroid.prototype.randomAsteroid = function (dimX, dimY) {
    var x = Math.random(dimX);
    var y = Math.random(dimY);
    var dx = Math.random() * 2 - 1 ;
    var dy = Math.random() * 2 - 1;
    return new Asteroid([x, y], [dx, dy]);
  }

})(this);