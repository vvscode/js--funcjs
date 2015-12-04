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