function complement(PRED) {
  return function() {
    return !PRED.apply(null, _.toArray(arguments));
  };
}

function isEven(n) {
  return (n % 2) === 0;
}

var isOdd = complement(isEven);


function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  };
}