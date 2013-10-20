(function (root) {
  var AG = root.AG = (root.AG || {});

  var color = 'white';
  var radius = 10;
  var acceleration = 0.10;
  var verticies = [[2 * Math.PI *  0 /  2, 13],
                   [2 * Math.PI *  7 / 16, 13],
                   [2 * Math.PI *  9 / 16, 13]];
  var thrusterVerticies = [[2 * Math.PI *  15 / 32, 13],
                           [2 * Math.PI *  16 / 32, 16],
                           [2 * Math.PI *  17 / 32, 13]];

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
    if (Ship.power) {
      this.drawThrusterFlame(ctx);
    }

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
      var x = this.pos[0] + radius * Math.cos(angle);
      var y = this.pos[1] + radius * Math.sin(angle);

      ctx.lineTo(x, y);
    }
    ctx.closePath();

    ctx.stroke();
  }

  Ship.prototype.drawThrusterFlame = function(ctx) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'orange';
    ctx.fillStyle = 'red';
    ctx.beginPath();

    var angle =  this.direction + thrusterVerticies[0][0];
    var radius = thrusterVerticies[0][1];
    var x = this.pos[0] + radius * Math.cos(angle);
    var y = this.pos[1] + radius * Math.sin(angle);

    ctx.moveTo(x, y);
    for (var i = 1; i < thrusterVerticies.length; i++ ) {

      var angle =  this.direction + thrusterVerticies[i][0];
      var radius = thrusterVerticies[i][1];
      var x = this.pos[0] + radius * Math.cos(angle);
      var y = this.pos[1] + radius * Math.sin(angle);

      ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.fill();
  }

  Ship.createShip = function () {
    return new Ship();
  }

  Ship.prototype.move = function (time) {
    this.updateDirection(time);
    this.updateVelocity(time);

    this.pos[0] = this.pos[0] + this.vel[0] * time;
    this.pos[1] = this.pos[1] + this.vel[1] * time;
  }

  Ship.prototype.updateVelocity = function(time) {
    Ship.power = key.isPressed("up");
    impulseX = Ship.power * Math.cos(this.direction) * acceleration;
    impulseY = Ship.power * Math.sin(this.direction) * acceleration;

    this.vel[0] = this.vel[0] + impulseX * time;
    this.vel[1] = this.vel[1] + impulseY * time;
  }

  Ship.prototype.updateDirection = function(time){
    var turn = 0;
    if(key.isPressed("left")) {
      turn -= (Math.PI * time) / 30;
    };
    if(key.isPressed("right")) {
      turn += (Math.PI * time) / 30;
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