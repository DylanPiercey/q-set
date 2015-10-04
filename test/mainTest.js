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
		set(obj, "a[]", 1);
		assert.equal(obj.a[0], 1);
		set(obj, "a[]", 1);
		assert.equal(obj.a[1], 1);
	});
});