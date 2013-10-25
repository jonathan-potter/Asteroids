(function (root) {
  var AG = root.AG = (root.AG || {});

  AG.bulletColor = 'red';
  AG.bulletRadius = 3;
  AG.bulletSpeed = 3;

  var Bullet = AG.Bullet = function (pos, vel, dir){
    this.color = AG.bulletColor;
    this.radius = AG.bulletRadius;
    this.pos = pos;
    this.objectType = "Bullet"

    // var velX = vel[0] + dir[0] * bulletSpeed;
    // var velY = vel[1] + dir[1] * bulletSpeed;

    var velX = dir[0] * AG.bulletSpeed;
    var velY = dir[1] * AG.bulletSpeed;

    this.vel = [velX,velY];
  }

  Bullet.inherits(AG.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();


    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  Bullet.createBullet = function (pos, vel, dir) {
    return new Bullet(pos, vel, dir);
  }

})(this);