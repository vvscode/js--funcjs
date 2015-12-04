module("Chapter 3", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});


test('LasyChain', function() {
  var lc = new LazyChain([2, 1, 3]);
  equal(lc.invoke('sort')._calls.length, 1);
  equal(typeof lc.invoke('sort')._calls[0], 'function');

  deepEqual(new LazyChain([2, 1, 3]).invoke('sort').force(), [1, 2, 3]);

  const invokeJoin = new LazyChain([2,1,3])
    .invoke('concat', [8,5,7,6])
    .invoke('sort')
    .invoke('join', ' ')
    .force();
  equal(invokeJoin, "1 2 3 5 6 7 8");

  var log = '';
  new LazyChain([2,1,3])
    .invoke('sort')
    .tap(function(i) {
      log += i;
    })
    .force();
  equal(log, '1,2,3');

  var log2 = '';
  var deferredSort = new LazyChain([2,1,3])
    .invoke('sort')
    .tap(function(i) {
      log2 += i;
    });
  equal(log2, '');
  deferredSort.force();
  equal(log2, '1,2,3');

  log2 += '|';
  new LazyChainChainChain(deferredSort)
    .invoke('toString')
    .force();
  equal(log2, '1,2,3|1,2,3');

});