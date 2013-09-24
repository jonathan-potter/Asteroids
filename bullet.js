(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var color = 'black';
  var radius = 5;
  var bulletSpeed = 5;

  var Bullet = Asteroids.Bullet = function (pos, vel){
    this.color = color;
    this.radius = radius;
    this.pos = pos;
    this.vel = [vel[0] * bulletSpeed, vel[1] * bulletSpeed];
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.createBullet = function (pos, vel) {
    return new Bullet(pos, vel);
  }

})(this);