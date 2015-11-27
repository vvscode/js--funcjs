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

test('unsplat function', function() {
  expect(2);
  var joinElements = unsplat(function(array) { return array.join(' ') });
  equal(joinElements(1, 2), '1 2', 'Concat elements');
  equal(joinElements('-', '$', '/', '!', ':'), '- $ / ! :', 'Concat elements');
});

test('unsplat function', function() {
  expect(1);
  var result = [100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual));
  deepEqual(result, [-2, -1, -1, 0, 1, 10, 100], 'Concat elements');
});

test('existy', function() {
  expect(6);
  equal(existy(null), false, 'null not existy');
  equal(existy(undefined), false, 'undefined not existy');
  equal(existy({}.notHere), false, 'unknown property not existy');
  equal(existy((function(){})()), false, 'empty result not existy');
  equal(existy(0), true, '0 is existy');
  equal(existy(false), true, 'false is existy');
});

test('truthy', function() {
  expect(4);
  equal(truthy(false), false, 'false is not truthy');
  equal(truthy(undefined), false, 'undefined is not truthy');
  equal(truthy(0), true, '0 is not truthy');
  equal(truthy(''), true, '"" is not truthy');
});