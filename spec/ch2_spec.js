module("Chapter 2", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

function T() {
  return true;
}
function F() {
  return false;
}

var library = [
  { title: "SICP", isbn: "0262010771", ed: 1 },
  { title: "SICP", isbn: "0262510871", ed: 2 },
  { title: "Joy of Clojure", isbn: "1935182641", ed: 1 }
];

test('allOf function', function() {
  expect(3);

  equal(allOf(), true, 'true on no params');
  equal(allOf(T, T), true, 'true on same params');
  equal(allOf(T, T, T, F), false, 'false on diff params');
});


test('anyOf function', function() {
  expect(3);

  equal(anyOf(T, T, F), true, 'true any true');
  equal(anyOf(F, F, F, F), false, 'false on no true params');
  equal(anyOf(), false, 'false on no params');
});

test('cat', function() {
  deepEqual(cat([1, 2, 3], [4, 5], [6, 7, 8]), [1, 2, 3, 4, 5, 6, 7, 8], 'concat list of arrays');
});

test('construct', function() {
  deepEqual(construct(42, [1, 2, 3]), [42, 1, 2, 3], 'add elements to array');
});

test('project', function() {
  var editionResults = project(library, ['title', 'isbn']);
  deepEqual(editionResults, [
    { isbn: "0262010771", title: "SICP" },
    { isbn: "0262510871", title: "SICP" },
    { isbn: "1935182641", title: "Joy of Clojure" }
  ], 'correct pick props');

  var isbnResults = project(editionResults, ['isbn']);
  deepEqual(isbnResults, [
    { isbn: "0262010771" },
    { isbn: "0262510871" },
    { isbn: "1935182641" }
  ], 'correct pick props');
});

test('rename', function() {
  deepEqual(
    rename({ a: 1, b: 2 }, { 'a': 'AAA' }),
    { AAA: 1, b: 2 },
    'correct rename props');
});

test('as', function() {
  /* SELECT ed AS edition FROM library; */
  deepEqual(
    as(library, { ed: 'edition' }),
    [
      { title: "SICP", isbn: "0262010771", edition: 1 },
      { title: "SICP", isbn: "0262510871", edition: 2 },
      { title: "Joy of Clojure", isbn: "1935182641", edition: 1 }
    ],
    'correct rename props');

  deepEqual(
    project(as(library, { ed: 'edition' }), ['edition']),
    [{ edition: 1 }, { edition: 2 }, { edition: 1 }],
    'correct pick renamed props');
});

test('restrict', function() {
  deepEqual(
    restrict(library, function(book) {
      return book.ed > 1;
    }),
    [{ title: "SICP", isbn: "0262510871", ed: 2 }],
    'correct filter items');

  /**
   SELECT title, isbn, edition FROM (
    SELECT ed AS edition FROM library
   ) EDS
   WHERE edition > 1;
   */
  deepEqual(
    restrict(
      project(
        as(library, { ed: 'edition' }),
        ['title', 'isbn', 'edition']), function(book) {
        return book.edition > 1;
      }),
    [{ title: "SICP", isbn: "0262510871", edition: 2 },],
    'correct filter items by calculated props');
});