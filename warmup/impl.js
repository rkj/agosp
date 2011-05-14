/**
 * obj - object where method is located; can be null for global functions
 * fnName - method name (string)
 * aspectFn - aspect function
 * when - optional string; can be "after" or "before". Default value is "before"
 * once - optional boolean; if true aspect will be executed only once; default value is false
 */
var createAspect = function(obj, fnName, aspectFn, when, once) {
  obj = obj || window;
  when = when || 'before';
  once = once || false;
  var old = obj[fnName];
  if (typeof(old) !== 'function') {
    throw new TypeError('oko');
  }
  var done = false;
  obj[fnName] = function() {
    if (when == 'before' && (!once || !done)) {
      aspectFn.apply(obj, arguments);
      done = true;
    }
    var ret = old.apply(obj, arguments);
    if (when == 'after' && (!once || !done)) {
      aspectFn.apply(obj, arguments);
      done = true;
    }
    return ret;
  }
}
