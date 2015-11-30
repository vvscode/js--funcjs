function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function(best, current) {
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);
    return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
  });
}

function best(fun, coll) {
  return _.reduce(coll, function(x, y) {
    return fun(x, y) ? x : y
  });
}

function repeat(times, VALUE) {
  return _.map(_.range(times), function() {
    return VALUE;
  });
}

function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

function iterateUntil(fun, check, init) {
  var ret = [];
  var result = fun(init);
  while (check(result)) {
    ret.push(result);
    result = fun(result);
  }
  return ret;
}

function invoker(NAME, METHOD) {
  return function(target /* args ... */) {
    if (!existy(target)) fail("Must provide a target");
    var targetMethod = target[NAME];
    var args = _.rest(arguments);
    return doWhen((existy(targetMethod) && METHOD === targetMethod), function() {
      return targetMethod.apply(target, args);
    });
  };
}