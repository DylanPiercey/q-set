var assert = require("assert");
var set    = require("../");

describe("Q-Set", function () {
	it("should set a key", function () {
		var obj = {};
		set(obj, "a", 1);
		assert.equal(obj.a, 1);
	});

	it("should set a deep key", function () {
		var obj = {};
		set(obj, "a[b][c]", 1);
		assert.equal(obj.a.b.c, 1);
	});

	it("should push a key", function () {
		var obj = {};
		set(obj, "a", 1);
		assert.deepEqual(obj.a, 1);
		set(obj, "a", 2);
		assert.deepEqual(obj.a, [1, 2]);
	});

	it("should push a key (explicit)", function () {
		var obj = {};
		set(obj, "a[]", 1);
		assert.deepEqual(obj.a, [1]);
		set(obj, "a[]", 2);
		assert.deepEqual(obj.a, [1, 2]);
	});

	it("should create an array with 0 integer.", function () {
		var obj = {};
		set(obj, "a[0]", 1);
		assert.deepEqual(obj.a, [1]);
		set(obj, "a[1]", 2);
		assert.deepEqual(obj.a, [1, 2]);
	});

	it("should create an array with any integer", function () {
		var obj = {};
		set(obj, "a[12]", 1);
		assert.deepEqual(obj.a, [ , , , , , , , , , , , , 1 ]);
	});

	it("should push a nested key (explicit)", function () {
		var obj = {};
		set(obj, "a[][b]", 1);
		assert.deepEqual(obj.a, [{ b: 1 }]);
		set(obj, "a[][b]", 2);
		assert.deepEqual(obj.a, [{ b: 1 }, { b: 2 }]);
	});

});
