AG.Kinetic = function (startGameCallback) {
  function writeMessage(message) {
    text.setText(message);
    layer.draw();
  }
  var stage = new Kinetic.Stage({
    container: 'container',
    width: AG.DIM_X,
    height: AG.DIM_Y
  });

  var layer = new Kinetic.Layer();

  var button = new Kinetic.Group({});

  var text = new Kinetic.Text({
    x: stage.getWidth() / 2 - 35,
    y: stage.getHeight() / 2 - stage.getHeight() / 60,
    fontFamily: 'Sans-Serif',
    fontSize: stage.getHeight() / 35,
    text: 'Start Game!',
    fill: 'white',
    align: 'center',
    listening: false
  });

  var rectangle = new Kinetic.Rect({
    x: stage.getWidth() / 2 - stage.getWidth() / 10,
    y: stage.getHeight() / 2 - stage.getHeight() / 20,
    width: stage.getWidth() / 5,
    height: stage.getHeight() / 10,
    stroke: 'white',
    fill: "#00A2FF",
    strokeWidth: 3,
    cornerRadius: 10
  });

  rectangle.on('mouseover', function() {
    this.setFill('red');
    layer.draw();
  });
  rectangle.on('mouseout', function() {
    this.setFill("#00A2FF");
    layer.draw();
  });
  rectangle.on('mousedown', function() {
    this.parent.parent.hide();
    startGameCallback();
  });

  button.add(rectangle);
  button.add(text);
  layer.add(button);
  stage.add(layer);

}