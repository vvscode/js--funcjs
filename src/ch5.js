function dispatch(/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;
  return function(target /*, args */) {
    var ret = undefined;
    var args = _.rest(arguments);
    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, construct(target, args));
      if (existy(ret)) return ret;
    }
    return ret;
  };
}

function always(VALUE) {
  return function() {
    return VALUE;
  };
};

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join("");
}

function rightAwayInvoker() {
  var args = _.toArray(arguments);
  var method = args.shift();
  var target = args.shift();
  return method.apply(target, args);
}
