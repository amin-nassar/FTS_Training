const { every } = require("../../js/arrayUtils");
describe("Array Every Function", () => {
  it("Should Return True If All Elements Satisfied The Callback", () => {
    const arrays = [
      [1, 2, 3, 4],
      [{ one: 1 }, { one: 2 }],
      ["A", "B", "C"],
      [[1], [2, 3], [4, 5]]
    ];
    const functions = [
      (e) => e < 10,
      (e) => "one" in e,
      (e) => e === e.toUpperCase(),
      (e) => Array.isArray(e)
    ];
    for (let i = 0; i < arrays.length; i++)
      expect(every(arrays[i], functions[i])).toBeTruthy();
  });
  it("Should Return False If Single Element Didn't Satisfy The Callback", () => {
    const arrays = [
      [2, 4, 6, 9],
      ["String", true, "String"]
    ];
    const functions = [(e) => e % 2 === 0, (e) => e instanceof String];
    for (let i = 0; i < arrays.length; i++) {
      expect(every(arrays[i], functions[i])).toBeFalsy();
    }
  });

  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        every(item, (e) => !!e);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Shoule Accept Only Function As Second Parameter", () => {
    const notFunctions = [10, true, {}, "Test", [], -Infinity];
    for (item of notFunctions) {
      expect(() => {
        every([1, 2, 3], item);
      }).toThrow(`${item} Is Not A Function`);
    }
  });
  it("Should Accept Callback With Three Parameters", () => {
    const array = [0, 1, 2, 3];
    const callback = function (element, index, _) {
      return element === index;
    };
    expect(every(array, callback)).toBeTruthy();
  });

  it("Accepts Third Parameter Of thisArg", () => {
    const arr = [14, 24, 35, 44];
    const callbaclWithThis = function (element) {
      return element % this.modBase === this.modResult;
    };
    const thisArg = { modBase: 10, modResult: 4 };
    expect(every(arr, callbaclWithThis, thisArg)).toBeFalsy();
  });
});
