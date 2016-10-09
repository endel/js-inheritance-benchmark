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

See below the results achieved by running each scenario 10x on Node v6.3.0.

Machine specs: Macbook Air / 1.3 GHz Intel Core i5 / 8GB 1600 MHz DDR3

**Label**

- [vanilla](vanilla/index.js): Plain ES5 standards JavaScript.
- [vanillaPromote](vanilla-promote/index.js): Derivation of "vanilla", used by libraries such as [EaselJS](https://github.com/CreateJS/EaselJS)
- [ts](ts/index.ts): TypeScript code transpiled down to ES5 using [TypeScript](https://github.com/Microsoft/TypeScript)
- [babel](es6/index.js): JavaScript code (ES6) transpiled down to ES5 using
  [babel](https://github.com/babel/babel)
- [buble](es6/index.js): JavaScript code (ES6) transpiled down to ES5 using
  [buble](https://gitlab.com/Rich-Harris/buble)
- [es6](es6/index.js): Plain ES6 standards JavaScript.

Execution time
---

| scenario (10 times) | vanilla | vanillaPromote | ts | babel | buble | es6 |
| --- | --- | --- | --- | --- | --- | --- |
| eval declarations | 1.21ms | 1.75ms | 2.85ms | 8.52ms | 0.82ms | 0.53ms |
| constructor without inheritance | 0.12ms | 0.08ms | 0.09ms | 0.19ms | 0.10ms | 0.09ms |
| constructor with 2 levels of inheritance | 0.22ms | 0.15ms | 0.17ms | 0.34ms | 0.27ms | 0.21ms |
| method call with two levels of inheritance | 0.10ms | 0.13ms | 0.15ms | 0.37ms | 0.16ms | 0.27ms |

Memory usage ( `process.memoryUsage().heapUsed` )
---

| scenario (10 times) | vanilla | vanillaPromote | ts | babel | buble | es6 |
| --- | --- | --- | --- | --- | --- | --- |
| eval declarations | 80.38k | 97.67k | 134.30k | 222.82k | 65.09k | 62.42k |
| constructor without inheritance | 3.47k | 2.32k | 2.48k | 3.09k | 2.38k | 2.34k |
| constructor with 2 levels of inheritance | 5.77k | 4.53k | 4.33k | 8.61k | 4.80k | 5.27k |
| method call with two levels of inheritance | 2.13k | 3.32k | 3.36k | 10.02k | 3.53k | 2.97k |

How to run
---

```
git clone https://github.com/endel/js-inheritance-benchmark.git
cd js-inheritance-benchmark
npm install
npm start
```

