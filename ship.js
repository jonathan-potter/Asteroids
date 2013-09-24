(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var COLOR = 'red';
  var RADIUS = 20;

  var Ship = Asteroids.Ship = function (){
    this.COLOR = COLOR;
    this.RADIUS = RADIUS;
    this.pos = [Asteroids.DIM_X/2, Asteroids.DIM_Y/2];
    this.vel = [0, 0];

    this.impulse = [0.2, 0.3];
  }


  Ship.inherits(Asteroids.MovingObject);

  Ship.createShip = function () {
    return new Ship();
  }

  Ship.prototype.move = function () {
    this.pos[0] = this.pos[0] + this.vel[0] + this.impulse[0];
    this.pos[1] = this.pos[1] + this.vel[1] + this.impulse[1];
  }


})(this);