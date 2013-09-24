(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var COLOR = 'red';
  var RADIUS = 20;

  var Ship = Asteroids.Ship = function (){
    this.COLOR = COLOR;
    this.RADIUS = RADIUS;
    this.pos = [Asteroids.DIM_X/2, Asteroids.DIM_Y/2];
    this.vel = [0, 0];

  }


  Ship.inherits(Asteroids.MovingObject);

  Ship.createShip = function () {
    return new Ship();


  }



})(this);