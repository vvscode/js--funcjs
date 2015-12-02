module("Chapter 3", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test('rightAwayInvoker', function() {
  deepEqual(rightAwayInvoker(Array.prototype.reverse, [1, 2, 3]), [3, 2, 1]);
});
