(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var color = 'black';
  var radius = 5;

  var Bullet = Asteroids.Bullet = function (pos, vel){
    this.color = color;
    this.radius = radius;
    this.pos = pos;
    this.vel = vel;
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.createBullet = function () {
    return new Bullet();
  }

})(this);