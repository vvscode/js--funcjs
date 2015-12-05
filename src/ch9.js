function lazyChain(obj) {
  var calls = [];
  return {
    invoke: function(methodName /* args */) {
      var args = _.rest(arguments);
      calls.push(function(target) {
        var meth = target[methodName];
        return meth.apply(target, args);
      });
      return this;
    },
    force: function() {
      return _.reduce(calls, function(ret, thunk) {
        return thunk(ret);
      }, obj);
    }
  };
}

function validator(message, fun) {
  var f = function(/* args */) {
    return fun.apply(fun, arguments);
  };
  f['message'] = message;
  return f;
}

function condition1(/* validators */) {
  var validators = _.toArray(arguments);
  return function(fun, arg) {
    var errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);
    if (!_.isEmpty(errors))
      throw new Error(errors.join(", "));
    return fun(arg);
  };
}

function cat() {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments)); else
    return [];
}

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

function deferredSort(ary) {
  return lazyChain(ary).invoke('sort');
}

function force(thunk) {
  return thunk.force();
}

var validateTriples = validator(
  "Each array should have three elements", function(arrays) {
    return _.every(arrays, function(a) {
      return a.length === 3;
    });
  });
var validateTripleStore = partial1(condition1(validateTriples), _.identity);

function postProcess(arrays) {
  return _.map(arrays, second);
}

function str(arr) {
  return arr.join(',');
}

function processTriples(data) {
  return pipeline(data
    , JSON.parse
    , validateTripleStore
    , deferredSort
    , force
    , postProcess
    , invoker('sort', Array.prototype.sort)
    , str);
}

var polyToString = dispatch(
  function(s) {
    return _.isString(s) ? s : undefined
  },
  function(s) {
    return _.isArray(s) ? stringifyArray(s) : undefined
  },
  function(s) {
    return _.isObject(s) ? JSON.stringify(s) : undefined
  },
  function(s) {
    return s.toString()
  }
);

function stringifyArray(ary) {
  return ["[", _.map(ary, polyToString).join(","), "]"].join('');
}

function Container(init) {
  this._value = init;
};

Container.prototype = {
  update: function(fun /*, args */) {
    var args = _.rest(arguments);
    var oldValue = this._value;
    this._value = fun.apply(this, construct(oldValue, args));
    return this._value;
  }
};

Container.prototype.toString = function() {
  return ["@<", polyToString(this._value), ">"].join('');
}