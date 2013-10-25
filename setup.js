$(document).ready( function () {
  console.log("setup running")

  $("#input_bubble_count").on("change", function(event) {
    var selectedIndex = event.currentTarget.selectedIndex;
    AG.spawnLimit = event.currentTarget.children[selectedIndex].value;
    this.blur();
  });

  $("#input_bullets_die").on("change", function(event) {
    var selectedIndex = event.currentTarget.selectedIndex;
    AG.bulletsDie = event.currentTarget.children[selectedIndex].value;
    this.blur();
  });

  $("#input_ship_dies").on("change", function(event) {
    var selectedIndex = event.currentTarget.selectedIndex;
    AG.shipDies = event.currentTarget.children[selectedIndex].value;
    this.blur();
  });

  $("#input_generations").on("change", function(event) {
    var selectedIndex = event.currentTarget.selectedIndex;
    AG.hitPoints = event.currentTarget.children[selectedIndex].value;
    this.blur();
  });

  $("#reset_game").on("click", function(event) {
    AG.game.reset();
    this.blur();
  })
});