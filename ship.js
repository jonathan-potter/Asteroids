(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var color = 'white';
  var radius = 10;
  var acceleration = 0.10

  var Ship = Asteroids.Ship = function (){
    this.color = color;
    this.radius = Asteroids.DIM_X/30;
    this.pos = [Asteroids.DIM_X/2, Asteroids.DIM_Y/2];
    this.vel = [0, 0];
    this.direction = Math.PI * 3 / 2;
  }

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.fillStyle = color;
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      this.direction + Math.PI * 1 / 4,
      this.direction - Math.PI * 1 / 4,
      false
    );

    ctx.stroke();
  }

  Ship.createShip = function () {
    return new Ship();
  }

  Ship.prototype.move = function () {
    this.updateDirection();
    this.updateVelocity();

    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
  }

  Ship.prototype.updateVelocity = function() {
    var power = key.isPressed("up");
    impulseX = power * Math.cos(this.direction) * acceleration;
    impulseY = power * Math.sin(this.direction) * acceleration;

    this.vel[0] = this.vel[0] + impulseX;
    this.vel[1] = this.vel[1] + impulseY;
  }

  Ship.prototype.updateDirection = function(){
    var turn = 0;
    if(key.isPressed("left")) {
      turn -= Math.PI / 30;
    };
    if(key.isPressed("right")) {
      turn += Math.PI / 30;
    };
    this.direction += turn;
  }

  Ship.prototype.fireBullet = function() {

    var offsetX = radius * Math.cos(this.direction);
    var offsetY = radius * Math.sin(this.direction);
    var posX = this.pos[0] + offsetX;
    var posY = this.pos[1] + offsetY;
    var dirX = Math.cos(this.direction);
    var dirY = Math.sin(this.direction);
    var velX = this.vel[0];
    var velY = this.vel[1];

    var bullet = Asteroids.Bullet.createBullet([posX, posY],
                                               [velX, velY],
                                               [dirX, dirY]);
    return bullet;
  }


})(this);