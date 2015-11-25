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