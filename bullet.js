(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var color = 'orange';
  var radius = 2;
  var bulletSpeed = 3;

  var Bullet = Asteroids.Bullet = function (pos, vel, dir){
    this.color = color;
    this.radius = Asteroids.DIM_X / 120;
    this.pos = pos;

    // var velX = vel[0] + dir[0] * bulletSpeed;
    // var velY = vel[1] + dir[1] * bulletSpeed;

    var velX = dir[0] * bulletSpeed;
    var velY = dir[1] * bulletSpeed;

    this.vel = [velX,velY];
  }

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.createBullet = function (pos, vel, dir) {
    return new Bullet(pos, vel, dir);
  }

})(this);