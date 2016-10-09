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
  Level0.call(this);
  this.num += 1;
}
Level1.prototype.method = function() {
  Level0.prototype.method.call(this);
  this.num += 1;
}
Level1.prototype = new Level0();
Level1.constructor = Level1;
module.exports.Level1 = Level1;

// Level 2
function Level2 () {
  Level1.call(this);
  this.num += 1;
}
Level2.prototype.method = function() {
  Level1.prototype.method.call(this);
  this.num += 1;
}
Level2.prototype = new Level1();
Level2.constructor = Level2;
module.exports.Level2 = Level2;
