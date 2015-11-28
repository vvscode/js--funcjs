function allOf(/* funs */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth && f();
  }, true);
}

function anyOf(/* funs */) {
  return _.reduceRight(arguments, function(truth, f) {
    return truth || f();
  }, false);
}

function cat() {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments)); else
    return [];
}

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

function project(table, keys) {
  return _.map(table, function(obj) {
    return _.pick.apply(null, construct(obj, keys));
  });
}

function rename(obj, newNames) {
  return _.reduce(newNames, function(o, nu, old) {
      if (_.has(obj, old)) {
        o[nu] = obj[old];
        return o;
      }
      else
        return o;
    },
    _.omit.apply(null, construct(obj, _.keys(newNames))));
}

function as(table, newNames) {
  return _.map(table, function(obj) {
    return rename(obj, newNames);
  });
}

function restrict(table, pred) {
  return _.reduce(table, function(newTable, obj) {
    if (truthy(pred(obj))) return newTable;
    else
      return _.without(newTable, obj);
  }, table);
}