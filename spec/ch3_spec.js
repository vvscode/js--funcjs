module("Chapter 3", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test('isOdd', function() {
  equal(typeof isOdd, 'function', 'isOdd function');
  equal(isOdd(2), false, '2 is not odd');
  equal(isOdd(413), true, '413 is odd');
});

test('plucker', function() {
  var best = { title: "Infinite Jest", author: "DFW" };
  var getTitle = plucker('title');
  equal(getTitle(best), "Infinite Jest", 'get title from object');

  var books = [{ title: "Chthon" }, { stars: 5 }, { title: "Botchan" }];
  var third = plucker(2);
  deepEqual(third(books), { title: "Botchan" }, 'pluck by index');

  deepEqual(_.filter(books, getTitle), [{ title: "Chthon" }, { title: "Botchan" }], 'can be used for iterators');
});