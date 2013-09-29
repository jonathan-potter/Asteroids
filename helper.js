Function.prototype.inherits = function (ParentClass) {
  var ChildClass = this;

  function Surrogate () { };

  Surrogate.prototype = ParentClass.prototype;

  ChildClass.prototype = new Surrogate();

}