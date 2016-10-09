class Level0 {
    constructor () {
        this.num = 0;
    }
    method () {
      this.num += 1;
    }
}
module.exports.Level0 = Level0;

class Level1 extends Level0 {
    constructor () {
        super();
        this.num += 1;
    }
    method () {
      super.method();
      this.num += 1;
    }
}
module.exports.Level1 = Level1;

class Level2 extends Level1 {
    constructor () {
        super();
        this.num += 1;
    }
    method () {
      super.method();
      this.num += 1;
    }
}
module.exports.Level2 = Level2;
