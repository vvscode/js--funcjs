module("Chapter 5", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test('stringReverse', function() {
  equal(stringReverse('abc'), 'cba');
  equal(stringReverse(1), undefined);


  var rev = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);
  deepEqual(rev([1, 2, 3]), [3, 2, 1]);
  equal(rev('abc'), 'cba');

  var sillyReverse = dispatch(rev, always(42));
  deepEqual(sillyReverse([1, 2, 3]), [3, 2, 1]);
  equal(sillyReverse('abc'), 'cba');
  equal(sillyReverse(100000), 42);
});

test('rightAwayInvoker', function() {
  deepEqual(rightAwayInvoker(Array.prototype.reverse, [1, 2, 3]), [3, 2, 1]);
});

test('about composing', function() {
  function isntString(str) {
    return !_.isString(str);
  }

  equal(isntString(1), true);

  var isntString = _.compose(function(x) {
    return !x
  }, _.isString);
  equal(isntString([]), true);

  function not(x) {
    return !x
  }
  var isntString = _.compose(not, _.isString);
  equal(isntString([]), true);
  equal(isntString(1), true);
});