const { findIndex } = require("../../js/arrayUtils");
describe("Array FindIndex Functions", () => {
  it("Should Return The Index Of The First Element That Satisfies The Callback", () => {
    const arrays = [
      [9, 1.2, 30, 14],
      [{ one: 1 }, { two: 2 }],
      ["a", "b", "C"],
      [[1], [2, 3], [4, 5]]
    ];
    const functions = [
      (e) => e > 10,
      (e) => "two" in e,
      (e) => e === e.toUpperCase(),
      (e) => e.length === 1
    ];
    const expectedOutput = [2, 1, 2, 0];
    for (let i = 0; i < arrays.length; i++) {
      expect(findIndex(arrays[i], functions[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Return Undefined If No Element Satisfied The Callback", () => {
    const arrays = [
      [27, 21, 18, 9],
      [[], {}, "String", 10]
    ];
    const functions = [(e) => e % 3 !== 0, (e) => e instanceof Boolean];
    for (let i = 0; i < arrays.length; i++) {
      expect(findIndex(arrays[i], functions[i])).toBeUndefined();
    }
  });

  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        findIndex(item, (e) => !!e);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Shoule Accept Only Function As Second Parameter", () => {
    const notFunctions = [10, true, {}, "Test", [], -Infinity];
    for (item of notFunctions) {
      expect(() => {
        findIndex([1, 2, 3], item);
      }).toThrow(`${item} Is Not A Function`);
    }
  });
  it("Should Accept Callback With Three Parameters", () => {
    const array = [16, 9, 2, 23];
    const callback = function (element, index, _) {
      return element === index;
    };
    expect(findIndex(array, callback)).toBe(2);
  });

  it("Accepts Third Parameter Of thisArg", () => {
    const arr = [11, 25, 31, 44];
    const callbaclWithThis = function (element) {
      return element % this.modBase === this.modResult;
    };
    const thisArg = { modBase: 10, modResult: 4 };
    expect(findIndex(arr, callbaclWithThis, thisArg)).toBe(3);
  });
});
