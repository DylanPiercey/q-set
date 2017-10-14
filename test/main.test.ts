import * as assert from "assert";
import { deep, shallow } from "../src";

describe("deep", () => {
  it("should set a key", () => {
    const obj: any = {};
    deep(obj, "a", 1);
    assert.equal(obj.a, 1);
  });

  it("should set an empty key", () => {
    const obj: any = {};
    deep(obj, "", 1);
    assert.equal(obj[""], 1);
  });

  it("should set a deep key", () => {
    const obj: any = {};
    deep(obj, "a[b][c]", 1);
    assert.equal(obj.a.b.c, 1);
  });

  it("should push a key", () => {
    const obj: any = {};
    deep(obj, "a", 1);
    assert.deepEqual(obj.a, 1);
    deep(obj, "a", 2);
    assert.deepEqual(obj.a, [1, 2]);
  });

  it("should push a key (explicit)", () => {
    const obj: any = {};
    deep(obj, "a[]", 1);
    assert.deepEqual(obj.a, [1]);
    deep(obj, "a[]", 2);
    assert.deepEqual(obj.a, [1, 2]);
  });

  it("should create an array with 0 integer.", () => {
    const obj: any = {};
    deep(obj, "a[0]", 1);
    assert.deepEqual(obj.a, [1]);
    deep(obj, "a[1]", 2);
    assert.deepEqual(obj.a, [1, 2]);
  });

  it("should create an array with any integer", () => {
    const obj: any = {};
    deep(obj, "a[12]", 1);
    assert.deepEqual(obj.a, [, , , , , , , , , , , , 1]);
  });

  it("should push a nested key (explicit)", () => {
    const obj: any = {};
    deep(obj, "a[][b]", 1);
    assert.deepEqual(obj.a, [{ b: 1 }]);
    deep(obj, "a[][b]", 2);
    assert.deepEqual(obj.a, [{ b: 1 }, { b: 2 }]);
  });
});

describe("shallow", () => {
  it("should set a key", () => {
    const obj: any = {};
    shallow(obj, "a", 1);
    assert.equal(obj.a, 1);
  });

  it("should set an empty key", () => {
    const obj: any = {};
    shallow(obj, "", 1);
    assert.equal(obj[""], 1);
  });

  it("should not set a deep key", () => {
    const obj: any = {};
    shallow(obj, "a[b][c]", 1);
    assert.equal(obj["a[b][c]"], 1);
  });

  it("should push a key", () => {
    const obj: any = {};
    shallow(obj, "a", 1);
    assert.deepEqual(obj.a, 1);
    shallow(obj, "a", 2);
    assert.deepEqual(obj.a, [1, 2]);
  });

  it("should insert indexes for push syntax", () => {
    const obj: any = {};
    shallow(obj, "a[]", 1);
    assert.deepEqual(obj["a[0]"], 1);
    shallow(obj, "a[]", 2);
    assert.deepEqual(obj["a[1]"], 2);
    // Nested
    shallow(obj, "b[][c][]", 1);
    assert.deepEqual(obj["b[0][c][0]"], 1);
    shallow(obj, "b[][c][]", 2);
    assert.deepEqual(obj["b[1][c][0]"], 2);
  });

  it("should insert indexes for push syntax in a sparse array", () => {
    const obj: any = { "a[1]": 2, "a[3]": 4 };
    shallow(obj, "a[]", 5);
    assert.deepEqual(obj["a[4]"], 5);
  });
});
