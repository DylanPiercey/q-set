var matchArray   = /[^\[\]]+|\[\]/g;
var matchInteger = /^\d+$/;
var temp         = [];

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
	var keys = path.match(matchArray);
	var len  = keys.length;
	var cur  = obj;
	var key, prev, next, exist;

	for (var i = 0; i < len; i++) {
		prev = cur;
		key  = keys[i];
		next = keys[i + 1];
		if (key === "[]") key = cur.length;
		// Make path as we go.
		cur = (exist = key in cur)
			? cur[key]
			// Check if the next path is an explicit array.
			: cur[key] = (next === "[]" || matchInteger.test(next))
				? []
				: {};
	}

	prev[key] = exist ? temp.concat(cur, val) : val;

	return obj;
};

/**
 * Like qset but doesn't resolve nested params such as a[b][c].
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} val
 */
function fSet (obj, key, val) {
	obj[key] = key in obj
		? temp.concat(obj[key], val)
		: val;
	return obj;
}

qSet.flat      = fSet;
module.exports = qSet;
