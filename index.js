var matchArray = /[^\[\]]+|(?=\[\])/g;

/*
 * A setter for querystring style fields like "a[b][c]".
 * The setter will create arrays for values like "a[]".
 *
 * @param {Object} obj
 * @param {String} path
 * @param {*} val
 */
function qSet (obj, path, val) {
	var keys = path.match(matchArray);
	var len  = keys.length;
	var cur  = obj;

	for (var i = 0; i < len; i++) {
		var key  = keys[i];
		var prev = cur;

		if (key === "") key = cur.length;
		cur = cur[key] != null
			? cur[key]
			: cur[key] = (
				keys[i + 1] === ""
					? []
					: {}
			);
	}

	prev[key] = val;
	return obj;
};

module.exports = qSet;