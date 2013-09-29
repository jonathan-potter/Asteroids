Function.prototype.inherits = function (ParentClass) {
  var ChildClass = this;

  console.log("inheriting: Parent: " + ParentClass)

  function Surrogate () { };

  Surrogate.prototype = ParentClass.prototype;

  ChildClass.prototype = new Surrogate();

}