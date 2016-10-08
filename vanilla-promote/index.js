function extend(subclass, superclass) {
  function o() { this.constructor = subclass; }
  o.prototype = superclass.prototype;
  return (subclass.prototype = new o());
};

function promote (subclass, prefix) {
  var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
  if (supP) {
    subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
    for (var n in supP) {
      if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
    }
  }
  return subclass;
}

// Level 0
function Level0 () {
  this.num = 0;
}
Level0.prototype.method = function() {
  this.num += 1;
}
module.exports.Level0 = Level0;

// Level 1
function Level1 () {
  this.Level0_constructor();
  this.num += 1;
}
extend(Level1, Level0);
Level1.prototype.method = function() {
  this.Level0_method();
  this.num += 1;
}
promote(Level1, "Level0");
module.exports.Level1 = Level1;

// Level 2
function Level2 () {
  this.Level1_constructor();
  this.num += 1;
}
extend(Level2, Level1);
Level2.prototype.method = function() {
  this.Level1_method();
  this.num += 1;
}
promote(Level2, "Level1");
module.exports.Level2 = Level2;
