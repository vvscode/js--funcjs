var rand = partial1(_.random, 1);

function randString(len) {
  var ascii = repeatedly(len, partial1(rand, 26));
  return _.map(ascii, function(n) {
    return n.toString(36);
  }).join('');
}

var PI = 3.14;
// PI = "Magnum";
function areaOfACircle(radius) {
  return PI * sqr(radius);
}

function second(a) {
  return nth(a, 1);
}
// ---

function generateRandomCharacter() {
  return rand(26).toString(36);
}

function generateString(charGen, len) {
  return repeatedly(len, charGen).join('');
}
