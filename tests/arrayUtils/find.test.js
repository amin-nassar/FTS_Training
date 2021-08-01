const { find } = require("../../js/arrayUtils");
describe("Array Find Function", () => {
  it("Should Return The First Element That Satisfies The Callback", () => {
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
    const expectedOutput = [30, { two: 2 }, "C", [1]];
    for (let i = 0; i < arrays.length; i++) {
      expect(find(arrays[i], functions[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Return Undefined If No Element Satisfied The Callback", () => {
    const arrays = [
      [27, 21, 18, 9],
      [[], {}, "String", 10]
    ];
    const functions = [(e) => e % 3 !== 0, (e) => e instanceof Boolean];
    for (let i = 0; i < arrays.length; i++) {
      expect(find(arrays[i], functions[i])).toBeUndefined();
    }
  });

  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        find(item, (e) => !!e);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Shoule Accept Only Function As Second Parameter", () => {
    const notFunctions = [10, true, {}, "Test", [], -Infinity];
    for (item of notFunctions) {
      expect(() => {
        find([1, 2, 3], item);
      }).toThrow(`${item} Is Not A Function`);
    }
  });
  it("Should Accept Callback With Three Parameters", () => {
    const array = [16, 9, 2, 23];
    const callback = function (element, index, _) {
      return element === index;
    };
    expect(find(array, callback)).toBe(2);
  });

  it("Accepts Third Parameter Of thisArg", () => {
    const arr = [14, 24, 34, 44];
    const callbaclWithThis = function (element) {
      return element % this.modBase !== this.modResult;
    };
    const thisArg = { modBase: 10, modResult: 4 };
    expect(find(arr, callbaclWithThis, thisArg)).toBeUndefined();
  });
});
