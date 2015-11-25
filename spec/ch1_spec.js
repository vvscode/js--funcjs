module( "Chapter 1", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test('splat function', function() {
  expect(1);
  const addArrayElements = splat(function(x, y) {
    return x + y
  });
  equal(addArrayElements([1, 2]), 3, 'just takes a function and returns another function ' +
    'that takes an array and calls the original with apply,' +
    'so that its elements serve as its arguments');

});