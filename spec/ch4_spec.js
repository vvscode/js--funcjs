module("Chapter 3", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test('finder', function() {
  var people = [{ name: "Fred", age: 65 }, { name: "Lucy", age: 36 }];

  equal(finder(_.identity, Math.max, [1, 2, 3, 4, 5]), 5);
  deepEqual(finder(plucker('age'), Math.max, people), { name: "Fred", age: 65 });
  deepEqual(finder(plucker('name'),
    function(x, y) {
      return (x.charAt(0) === "L") ? x : y
    }, people), { name: "Lucy", age: 36 });
});

test('best', function() {
  equal(best(function(x, y) {
    return x > y;
  }, [1, 2, 3, 4, 5]), 5);
});

test('repeat', function() {
  deepEqual(repeat(4, "Major"), ["Major", "Major", "Major", "Major"]);
});

test('repeatedly', function() {
  var i = 0;
  deepEqual(repeatedly(3, function() {
    return ++i;
  }), [1, 2, 3]);

  deepEqual(repeatedly(3, function() {
    return "Odelay!";
  }), ["Odelay!", "Odelay!", "Odelay!"]);

  var j = 0;
  repeatedly(5, function(n) {
    j = j + 2;
  });
  equal(j, 10);

  deepEqual(repeatedly(10, function(exp) {
      return Math.pow(2, exp + 1)
    }),
    [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]
  );
});

test('iterateUntil', function() {
  var result =
    iterateUntil(function(n) {
        return n + n;
      },
      function(n) {
        return n <= 1024;
      },
      1);
  deepEqual(result, [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);
});

test('invoker', function() {
  var rev = invoker('reverse', Array.prototype.reverse);
  deepEqual(_.map([[1,2,3]], rev), [[3,2,1]]);
})