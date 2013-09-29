(function (root) {
  var AG = root.AG = (root.AG || {});

  var color = 'grey';
  var radius = 10;


  var Asteroid = AG.Asteroid = function (pos, vel){
    this.pos = pos;
    this.vel = vel;
    this.color = color;
    this.radius = AG.DIM_X / 30;
    this.objectType = "Asteroid"
  }

  Asteroid.inherits(AG.MovingObject);

  Asteroid.randomAsteroid = function (dimX, dimY) {

    var xy = Math.floor(Math.random() * 2); // coming from x or y
    var pn = Math.floor(Math.random() * 2); // coming from positive or negative

    var x;
    var y;

    if (xy == 0) {  // x
      if (pn == 0) {
        x = -radius;
      } else {
        x = AG.DIM_X + radius;
      }
      y = Math.random() * AG.DIM_Y;
    } else {        // y
      x = Math.random() * AG.DIM_X;
      if (pn == 0) {
        y = -radius;
      } else {
        y = AG.DIM_Y + radius;
      }
    }

    // var x = Math.floor(Math.random() * dimX);
    //     var y = Math.floor(Math.random() * dimY);
    var dx = Math.random() * 2 - 1;
    var dy = Math.random() * 2 - 1;

    var newAsteroid = new Asteroid([x, y], [dx, dy]);
    return newAsteroid;
  }

})(this);