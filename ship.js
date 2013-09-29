(function (root) {
  var AG = root.AG = (root.AG || {});

  var color = 'white';
  var radius = 10;
  var acceleration = 0.10
  var verticies = [[2 * Math.PI *  0 /  2, 13],
                   [2 * Math.PI *  7 / 16, 13],
                   [2 * Math.PI *  9 / 16, 13]];

  var Ship = AG.Ship = function (){
    this.color = color;
    this.radius = AG.DIM_X/30;
    this.pos = [AG.DIM_X/2, AG.DIM_Y/2];
    this.vel = [0, 0];
    this.direction = Math.PI * 3 / 2;
    this.objectType = "Ship"
  }

  Ship.inherits(AG.MovingObject);

  Ship.prototype.draw = function (ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.beginPath();

    var angle =  this.direction + verticies[0][0];
    var radius = verticies[0][1];
    var x = this.pos[0] + radius * Math.cos(angle);
    var y = this.pos[1] + radius * Math.sin(angle);

    ctx.moveTo(x, y);
    for (var i = 1; i < verticies.length; i++ ) {

      var angle =  this.direction + verticies[i][0];
      var radius = verticies[i][1];
      var a = this.pos[0] + radius * Math.cos(angle);
      var b = this.pos[1] + radius * Math.sin(angle);

      console.log("x: " + x + " y: " + y)
      console.log("angle: " + angle + " radius: " + radius)

      ctx.lineTo(a, b);
    }
    ctx.closePath();

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

    var bullet = AG.Bullet.createBullet([posX, posY],
                                               [velX, velY],
                                               [dirX, dirY]);
    return bullet;
  }


})(this);