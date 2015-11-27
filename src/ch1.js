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
    return fun.call(null, [].splice.call(arguments, 0));
  }
}

function comparator(pred) {
  return function(x, y) {
    if (truthy(pred(x, y)))return -1;
    else if (truthy(pred(y, x)))
      return 1; else
      return 0;
  };
}

function lessOrEqual(x, y) {
  return x <= y;
}

function existy(x) {
  return x != null;
}

function truthy(x) {
  return (x !== false) && existy(x)
}

function doWhen(cond, action) {
  if(truthy(cond)) {
    return action();
  }
  return undefined;
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    // todo: check babel settings to fix failing
    // on template strings
    console.log('The result is ', result);
    return result;
  });
}