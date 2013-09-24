(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var color = 'red';
  var radius = 20;

  var Ship = Asteroids.Ship = function (){
    this.color = color;
    this.radius = radius;
    this.pos = [Asteroids.DIM_X/2, Asteroids.DIM_Y/2];
    this.vel = [0, 0];
    this.direction = Math.PI * 3 / 2;
  }

  Ship.inherits(Asteroids.MovingObject);


  Ship.prototype.draw = function (ctx) {
    console.log("this is where the ship should draw")
    ctx.fillStyle = "green";
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      this.direction + Math.PI * 1 / 4,
      this.direction - Math.PI * 1 / 4,
      false
    );

    ctx.fill();
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
    var power = key.isPressed("up")
    impulseX = power * Math.cos(this.direction) * 0.05
    impulseY = power * Math.sin(this.direction) * 0.05

    this.vel[0] = this.vel[0] + impulseX;
    this.vel[1] = this.vel[1] + impulseY;
  }

  Ship.prototype.updateDirection = function(){
    var turn = 0;
    if(key.isPressed("left")) {
      turn += Math.PI / 18;
    };
    if(key.isPressed("right")) {
      turn -= Math.PI / 18;
    };
    this.direction += turn;
    console.log(this.direction)
  }


})(this);