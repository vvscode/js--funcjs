/*
just takes a function and returns another function
that takes an array and calls the original with apply,
so that its elements serve as its arguments
 */
function splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  }
}

function unsplat(fun) {
  return function() {
    return fun.call(null, [].splice.call(arguments,0));
  }
}