const fs = require('fs');
const present = require('present');

const targets = {
  vanilla: { module: require('./vanilla'), source: fs.readFileSync('./vanilla/index.js').toString() },
  vanillaPromote: { module: require('./vanilla-promote'), source: fs.readFileSync('./vanilla-promote/index.js').toString() },
  ts: { module: require('./ts'), source: fs.readFileSync('./ts/index.js').toString() },
  babel: { module: require('./babel'), source: fs.readFileSync('./babel/index.js').toString() },
  es6: { module: require('./babel/index-babel.js'), source: fs.readFileSync('./babel/index-babel.js').toString() },
};

const numLoops = 10;

let suites = [];
let executionTable = [];
let executionRow = [];

let memoryTable = [];
let memoryRow = [];
let previousMemory = null;
function addExecutionRow(elapsedTime) {
  executionRow.push(elapsedTime.toFixed(2) + "ms");

  let currentMemory = process.memoryUsage();
  memoryRow.push( ((currentMemory.heapUsed - previousMemory.heapUsed)/1024).toFixed(2) + "k" );
}

function updateComparisionTable () {
  executionTable.push(executionRow);
  executionRow = [];

  memoryTable.push(memoryRow);
  memoryRow = [];
}

function bench (name, callback, numLoops, cleanup) {
  flushMemoryUsage();

  let now = present();

  for (let i=0; i<numLoops; i++) {
    callback();
  }

  addExecutionRow(present() - now);

  if (cleanup) { cleanup(); }
}

function suite (name) {
  suites.push(name);
}

function flushMemoryUsage () {
  global.gc();
  previousMemory = process.memoryUsage();
}

function buildTable (table) {
  let lines = [];
  let currentRow = [];

  let scenarios = suites.slice(0);

  // Header
  currentRow.push('scenario ('+numLoops+' times)');
  for (let target in targets) {
    currentRow.push(target);
  }
  lines.push(currentRow);

  let headerSeparator = table[0].map(function(){ return "---"; });
  headerSeparator.push("---");
  lines.push( headerSeparator );

  for (let i=0, l=scenarios.length; i<l; i++) {
    currentRow = [ scenarios.shift() ];

    let executionEntries = table.shift();
    currentRow = currentRow.concat( executionEntries.map(function(execution) {
      return execution;
    }) );

    lines.push(currentRow);
  }

  return lines.map(function(line) { return "| " + line.join(" | ") + " |" }).join("\n");
}

//
// Run benchmark suites
//

suite("eval declarations");
for (let target in targets) {
  bench(target, function() {
    eval(targets[target].source);
  }, numLoops);
}
updateComparisionTable();

//
// level 0 constructor benchmarks
//
suite("constructor without inheritance")
for (let target in targets) {
  bench(target, function() {
    new targets[target].module.Level0;
  }, numLoops);
}
updateComparisionTable();

//
// level 2 constructor benchmarks
//
let instances = [];
let cleanup = function() { instances.length = 0; }
suite("constructor with 2 levels of inheritance");
for (let target in targets) {
  bench(target, function() {
    instances.push(new targets[target].module.Level2());
  }, numLoops, cleanup);
}
updateComparisionTable();

//
// level 2 super method call
//
suite("method call with two levels of inheritance");
for (let target in targets) {
  let instance = new targets[target].module.Level2();
  bench(target, function() {
    instance.method();
  }, numLoops);
}
updateComparisionTable();

//
// Output markdown tables
//

console.log('Execution time');
console.log('---');
console.log('');
console.log( buildTable(executionTable) );

console.log('');

console.log('Memory usage ( `process.memoryUsage().heapUsed` )');
console.log('---');
console.log('');
console.log( buildTable(memoryTable) );
