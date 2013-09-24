(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.RADIUS = radius;
    this.COLOR = color;
    console.log(color)
  }

  MovingObject.prototype.move = function () {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.COLOR;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.RADIUS,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var xDist = (this.pos[0] - otherObject.pos[0]);
    var yDist = (this.pos[1] - otherObject.pos[1]);
    var distance = Math.pow(xDist * xDist + yDist * yDist,0.5);

    return (distance < (this.RADIUS + otherObject.RADIUS));
  }

  MovingObject.prototype.outOfBounds = function () {
    var obx = this.pos[0] < (0 - this.RADIUS) ||
      (Asteroids.DIM_X + this.RADIUS) < this.pos[0];
    var oby = this.pos[1] < (0 - this.RADIUS) ||
      (Asteroids.DIM_Y + this.RADIUS) < this.pos[1];
    return (obx || oby);
  }

})(this);

// MO = new MovingObject([100,100],[0,10],50,"red");
// OO = new MovingObject([100,100],[0,10],50,"red");
// console.log(MO.isCollidedWith(OO));

