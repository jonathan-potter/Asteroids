(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var COLOR = 'grey';
  var RADIUS = 20;


  var Asteroid = Asteroids.Asteroid = function (pos, vel){
    console.log("creating asteroid")
    this.pos = pos;
    this.vel = vel;
    this.COLOR = COLOR;
    this.RADIUS = RADIUS;
    // MovingObject.call(this, pos, vel, RADIUS, COLOR);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  // Asteroid.prototype = new MovingObject(, this.vel, RADIUS, COLOR)

  Asteroid.randomAsteroid = function (dimX, dimY) {
    var x = Math.floor(Math.random() * dimX);
    var y = Math.floor(Math.random() * dimY);
    var dx = Math.random() * 2 - 1 ;
    var dy = Math.random() * 2 - 1;

    var newAsteroid = new Asteroid([x, y], [dx, dy]);
    return newAsteroid;
  }

})(this);