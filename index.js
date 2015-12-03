var matchArray = /[^\[\]]+/g;
var temp       = [];

/*
 * @description
 * A setter for querystring style fields like "a[b][c]".
 * The setter will create arrays for repeat keys.
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} val
 */
function qSet (obj, path, val) {
	var key;
	var keys = path.match(matchArray);
	var last = keys.pop();
	var len  = keys.length;
	var cur  = obj;

	for (var i = 0; i < len; i++) {
		key = keys[i];
		cur = cur[key] != null ? cur[key] : cur[key] = {};
	}

	cur[last] = last in cur
		? temp.concat(cur[last], val)
		: val;

	return obj;
};

module.exports = qSet;
