module("Chapter 9", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});


test('lazyChain', function() {
  var deferredSorts = _.map([[2, 1, 3], [7, 7, 1], [0, 9, 5]], deferredSort);
  equal(_.isArray(deferredSorts), true);
  equal(deferredSorts.length, 3);
  deferredSorts.forEach(function(item) {
    equal(typeof item.force, 'function');
    equal(typeof item.invoke, 'function');
  });

  var lazyOp = lazyChain([2, 1, 3])
    .invoke('concat', [7, 7, 8, 9, 0])
    .invoke('sort');

  deepEqual(lazyOp.force(), [0, 1, 2, 3, 7, 7, 8, 9]);

  var deferredSorts2 = _.map([[2, 1, 3], [7, 7, 1], [0, 9, 5]], deferredSort);
  deepEqual(_.map(deferredSorts2, force), [[1, 2, 3], [1, 7, 7], [0, 5, 9]]);
});

test('validateTripleStore', function() {
  deepEqual(
    validateTripleStore([[2, 1, 3], [7, 7, 1], [0, 9, 5]]),
    [[2, 1, 3], [7, 7, 1], [0, 9, 5]]
  );
});

test('processTriples', function() {
  equal(processTriples("[[2,1,3], [7,7,1], [0,9,5]]"), "1,7,9");
});