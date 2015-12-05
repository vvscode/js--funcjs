module("Chapter 7", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});


test('generateString', function() {
  var str = generateString(always("a"), 10);
  equal(str.constructor, String);
  equal(str, 'aaaaaaaaaa');

  var result = repeatedly(10000, generateRandomCharacter);
  equal(_.every(result, _.isString), true);
  equal(_.every(result, function(s) { return s.length === 1 }), true);

  equal(_.every(result, function(s) { return /[a-z0-9]/.test(s) }), true);
  equal(_.any(result, function(s) { return /[A-Z]/.test(s) }), false);
});