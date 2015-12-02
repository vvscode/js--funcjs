function recLength(arr) {
  if (_.isEmpty(arr)) {
    return 0;
  } else {
    return 1 + recLength(_.rest(arr));
  }
}

function cycle(times, arr) {
  if (times <= 0) {
    return [];
  } else {
    return cat(arr, cycle(times - 1, arr));
  }
}

function fail(err) {
  throw err;
}

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > a.length - 1))
    fail("Index value is out of bounds");
  return a[index];
}

function second(a) {
  return nth(a, 1);
}

function constructPair(pair, rests) {
  return [construct(_.first(pair), _.first(rests)),
    construct(second(pair), second(rests))];
}

function unzip(pairs) {
  if (_.isEmpty(pairs)) return [[], []];
  return constructPair(_.first(pairs), unzip(_.rest(pairs)));
}

function nexts(graph, node) {
  if (_.isEmpty(graph)) return [];
  var pair = _.first(graph);
  var from = _.first(pair);
  var to = second(pair);
  var more = _.rest(graph);
  if (_.isEqual(node, from)) {
    return construct(to, nexts(more, node));
  }
  return nexts(more, node);
}

function depthSearch(graph, nodes, seen) {
  if (_.isEmpty(nodes)) return rev(seen);
  var node = _.first(nodes);
  var more = _.rest(nodes);
  if (_.contains(seen, node))
    return depthSearch(graph, more, seen);
  else
    return depthSearch(graph,
      cat(nexts(graph, node), more),
      construct(node, seen));
}

var rev = invoker('reverse', Array.prototype.reverse);

function depthSearch(graph, nodes, seen) {
  if (_.isEmpty(nodes)) return rev(seen);
  var node = _.first(nodes);
  var more = _.rest(nodes);
  if (_.contains(seen, node))
    return depthSearch(graph, more, seen);
  else
    return depthSearch(graph,
      cat(nexts(graph, node), more),
      construct(node, seen));
}

function tcLength(ary, n) {
  var l = n ? n : 0;
  if (_.isEmpty(ary)) return l;
  else
    return tcLength(_.rest(ary), l + 1);
}

function andify(/* preds */) {
  var preds = _.toArray(arguments);
  return function(/* args */) {
    var args = _.toArray(arguments);
    var everything = function(ps, truth) {
      if (_.isEmpty(ps))
        return truth; else
        return _.every(args, _.first(ps))
          && everything(_.rest(ps), truth);
    };
    return everything(preds, true);
  };
}

function zero(x) {
  return x == 0;
}

function orify(/* preds */) {
  var preds = _.toArray(arguments);
  return function(/* args */) {
    var args = _.toArray(arguments);
    var something = function(ps, truth) {
      if (_.isEmpty(ps))
        return truth; else
        return _.some(args, _.first(ps))
          || something(_.rest(ps), truth);
    };
    return something(preds, false);
  };
}

function flat(array) {
  if (_.isArray(array))
    return cat.apply(cat, _.map(array, flat)); else
    return [array];
}
