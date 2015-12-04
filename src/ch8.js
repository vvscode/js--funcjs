function LazyChain(obj) {
  this._calls = [];
  this._target = obj;
}

LazyChain.prototype.invoke = function(methodName /*, args */) {
  var args = _.rest(arguments);
  this._calls.push(function(target) {
    var meth = target[methodName];
    return meth.apply(target, args);
  });
  return this;
};


LazyChain.prototype.force = function() {
  return _.reduce(this._calls, function(target, thunk) {
    return thunk(target);
  }, this._target);
};

LazyChain.prototype.tap = function(fun) {
  this._calls.push(function(target) {
    fun(target);
    return target;
  });
  return this;
};

function LazyChainChainChain(obj) {
  var isLC = (obj instanceof LazyChain);
  this._calls = isLC ? cat(obj._calls, []) : [];
  this._target = isLC ? obj._target : obj;
}
LazyChainChainChain.prototype = LazyChain.prototype;

function pipeline(seed /*, args */) {
  return _.reduce(_.rest(arguments), function(l, r) {
    return r(l);
  }, seed);
}


function fifth(a) {
  return pipeline(a
    , _.rest
    , _.rest
    , _.rest
    , _.rest
    , _.first);
}

function negativeFifth(a) {
  return pipeline(a
    , fifth
    , function(n) {
      return -n
    });
}

function firstEditions(table) {
  return pipeline(table,
    function(t) {
      return as(t, { ed: 'edition' })
    },
    function(t) {
      return project(t, ['title', 'edition', 'isbn'])
    },
    function(t) {
      return restrict(t, function(book) {
        return book.edition === 1;
      });
    });
}
