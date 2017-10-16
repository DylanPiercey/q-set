const matchArray: RegExp = /[^\[\]]+|\[\]/g;
const matchInteger: RegExp = /^\d+$/;
const temp: any[] = [];

/**
 * @description
 * A setter for querystring style fields like "a[b][c]".
 * The setter will create arrays for repeat keys and supports the "[]" push syntax.
 *
 * @example
 * deep({}, "a[b][c]", 1) // { a: { b: { c: 1 } } }
 *
 * @param obj The object to set a value on.
 * @param path The querystring path to set.
 * @param value The value to set at the path.
 */
export function deep(obj: any, path: string, value: any): any {
  const keys: string[] =
    path === "" ? [""] : path.match(matchArray) as string[];
  const len: number = keys.length;
  let cur: any = obj;
  let prev: any;
  let key: string;
  let exists: boolean;

  for (let i = 0; i < len; i++) {
    prev = cur;
    key = keys[i];
    const next = keys[i + 1];

    if (key === "[]") {
      key = cur.length;
    }

    // Make path as we go.
    cur = (exists = typeof cur === "object" && key in cur)
      ? cur[key]
      : // Check if the next path is an explicit array.
        (cur[key] = next === "[]" || matchInteger.test(next) ? [] : {});
  }

  prev[key] = exists ? temp.concat(cur, value) : value;

  return obj;
}

/**
 * @description
 * Appends to an object using query string syntax with "[]" syntax push support.
 *
 * @example
 * shallow({}, "a[b][c]", 1) // { "a[b][c]": 1 }
 * shallow({}, "a[]", 1) // { a: [1] }
 *
 * @param obj The object to set a value on.
 * @param path The querystring path to set.
 * @param value The value to set at the path.
 */
export function shallow(obj: any, key: string, val: any): any {
  key = arrayPushIndexes(obj, key);
  obj[key] = key in obj ? temp.concat(obj[key], val) : val;
  return obj;
}

/**
 * Given a qs style key and an object will convert array push syntax to integers.
 * Eg: a[b][] -> a[b][0]
 */
function arrayPushIndexes(obj: any, key: string): string {
  const path: string[] = key.split("[]");
  if (path.length === 1) {
    return key;
  }

  let cur: string = path[0];
  const keys: string[] = Object.keys(obj);

  for (let i = 1, len = path.length; i < len; i++) {
    cur += "[" + findLastIndex(keys, cur) + "]" + path[i];
  }

  return cur;
}

/**
 * Given a path to push to will return the next valid index if possible.
 * Eg: a[b][] -> 0 // if array is empty.
 */
function findLastIndex(keys: string[], path: string): number {
  let last: number = -1;

  for (let i = keys.length; i--; ) {
    const key: string = keys[i];
    if (key.indexOf(path) !== 0) {
      continue;
    }

    const index: number = Number(
      key.replace(path, "").slice(1, key.indexOf("]") - 1)
    );

    if (index > last) {
      last = index;
    }
  }

  return last + 1;
}
