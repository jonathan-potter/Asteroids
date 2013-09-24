function MovingObject (pos, vel, radius, color) {
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
}

MovingObject.prototype.move = function () {
  this.pos[0] += vel[0];
  this.pos[1] += vel[1];
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI
  );

  ctx.fill();
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var xDist = (this.pos[0] - otherObject.pos[0]);
  var yDist = (this.pos[1] - otherObject.pos[1]);
  var distance = Math.pow(xDist * xDist + yDist * yDist,0.5);

  return (distance < (this.radius + otherObject.radius));
}

// MO = new MovingObject([100,100],[0,10],50,"red");
// OO = new MovingObject([100,100],[0,10],50,"red");
// console.log(MO.isCollidedWith(OO));

