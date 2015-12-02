module("Chapter 3", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'JavaScript']
];

test('recLength', function() {
  equal(recLength(_.range(10)), 10);
  equal(recLength([]), 0);
  equal(recLength(_.range(100)), 100);
});

test('cycle', function() {
  deepEqual(cycle(2, [1, 2]), [1, 2, 1, 2]);
  deepEqual(_.take(cycle(20, [1, 2, 3]), 11), [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2]);
});

test('constructPair', function() {
  deepEqual(constructPair(['a', 1], [[], []]), [['a'], [1]]);
  deepEqual(_.zip.apply(null, constructPair(['a', 1], [[], []])), [['a', 1]]);
  deepEqual(constructPair(['a', 1],
    constructPair(['b', 2],
      constructPair(['c', 3], [[], []]))), [['a', 'b', 'c'], [1, 2, 3]]);
});

test('unzip', function() {
  deepEqual(unzip(_.zip([1, 2, 3], [4, 5, 6])), [[1, 2, 3], [4, 5, 6]]);
});

test('nexts', function() {
  deepEqual(nexts(influences, 'Lisp'), ["Smalltalk", "Scheme"]);
});

test('depthSearch', function() {
  deepEqual(depthSearch(influences, ['Lisp'], []),
    ["Lisp", "Smalltalk", "Self", "Lua", "JavaScript", "Scheme"]);
  deepEqual(depthSearch(influences, ['Smalltalk', 'Self'], []),
    ["Smalltalk", "Self", "Lua", "JavaScript"]);
  deepEqual(depthSearch(construct(['Lua', 'Io'], influences), ['Lisp'], []),
    ["Lisp", "Smalltalk", "Self", "Lua", "Io", "JavaScript", "Scheme"]);
});

test('recLength', function() {
  equal(tcLength(_.range(10)), 10);
  equal(tcLength([]), 0);
  equal(tcLength(_.range(100)), 100);
});

test('andify', function() {
  var evenNums = andify(_.isNumber, isEven);

  equal(evenNums(1, 2), false);
  equal(evenNums(2, 4, 6, 8), true);
  equal(evenNums(2, 4, 6, 8, 9), false);
});

test('orify', function() {
  var zeroOrOdd = orify(isOdd, zero);
  equal(zeroOrOdd(), false);
  equal(zeroOrOdd(0, 2, 4, 6), true);
  equal(zeroOrOdd(2, 4, 6), false);
});

test('flat', function() {
  deepEqual(flat([[1, 2], [3, 4]]), [1, 2, 3, 4]);
  deepEqual(flat([[1, 2], [3, 4, [5, 6, [[[7]]], 8]]]), [1, 2, 3, 4, 5, 6, 7, 8]);
})