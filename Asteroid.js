(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var color = 'grey';
  var radius = 20;


  var Asteroid = Asteroids.Asteroid = function (pos, vel){
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.radius = radius;
    // MovingObject.call(this, pos, vel, radius, color);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  // Asteroid.prototype = new MovingObject(, this.vel, radius, color)

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var x = Math.floor(Math.random() * dimX);
    var y = Math.floor(Math.random() * dimY);
    var dx = Math.random() * 2 - 1 ;
    var dy = Math.random() * 2 - 1;

    var newAsteroid = new Asteroid([x, y], [dx, dy]);
    return newAsteroid;
  }

})(this);