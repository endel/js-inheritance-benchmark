export class Level0 {
    protected num: number;

    constructor () {
        this.num = 0;
    }

    method () {
        this.num += 1;
    }
}

export class Level1 extends Level0 {
    constructor () {
        super();
        this.num += 1;
    }

    method () {
        super.method();
        this.num += 1;
    }
}

export class Level2 extends Level1 {
    constructor () {
        super();
        this.num += 1;
    }

    method () {
        super.method();
        this.num += 1;
    }
}
