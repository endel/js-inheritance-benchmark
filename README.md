JavaScript Inheritance Benchmark
===

> For detailed report on source code output size, compilation and execution time
> of different build tools, have a look at [The cost of transpiling es2015 in
> 2016](https://github.com/samccone/The-cost-of-transpiling-es2015-in-2016)

This project investigates code execution performance when using inheritance with
transpiled and not transpiled JavaScript code.

Motivation
---

Now that JavaScript supports
[classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes),
we just want to use them. Unfortunately, it's still necessary to transpile ES6/7
down to ES5 to support all browser environments.

Current results
===

See below the results achieved by running on Node v6.3.0.

> Machine specs: Macbook Air / 1.3 GHz Intel Core i5 / 8GB 1600 MHz DDR3

**Label**

- [vanilla](vanilla/index.js): Plain ES5 standards JavaScript.
- [vanillaPromote](vanilla-promote/index.js): Derivation of "vanilla", used by libraries such as [EaselJS](https://github.com/CreateJS/EaselJS)
- [ts](ts/index.ts): TypeScript code transpiled down to ES5
- [babel](babel/index-babel.js): JavaScript code (ES6) transpiled down to ES5
- [es6](babel/index-babel.js): Plain ES6 standards JavaScript.

Execution time
---

| scenario | vanilla | vanillaPromote | ts | babel | es6 |
| --- | --- | --- | --- | --- | --- |
| eval declarations | 0.65ms | 0.75ms | 0.44ms | 0.73ms | 0.27ms |
| constructor without inheritance | 0.42ms | 0.46ms | 0.35ms | 0.36ms | 1.34ms |
| constructor with 2 levels of inheritance | 1.17ms | 1.12ms | 0.85ms | 3.43ms | 1.78ms |
| method call with two levels of inheritance | 0.65ms | 0.58ms | 0.69ms | 1.62ms | 2.67ms |

Memory usage
---

| scenario | vanilla | vanillaPromote | ts | babel | es6 |
| --- | --- | --- | --- | --- | --- |
| eval declarations | 28.63k | 22.18k | 14.86k | 27.13k | 10.27k |
| constructor without inheritance | 36.23k | 33.88k | 34.52k | 40.86k | 58.16k |
| constructor with 2 levels of inheritance | 83.39k | 72.97k | 67.45k | 204.32k | 67.49k |
| method call with two levels of inheritance | 4.82k | 18.53k | 15.02k | 126.43k | 9.12k |

How to run
---

```
git clone https://github.com/endel/js-inheritance-benchmark.git
cd js-inheritance-benchmark
npm install
npm start
```

