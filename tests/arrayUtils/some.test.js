const { some } = require("../../js/arrayUtils");
describe("Array Some Function", () => {
  it("Should Return True If Single Element Satisfy The Callback", () => {
    const arrays = [
      [1, 2, 99, 3, 4],
      ["Amin", "B", "C"],
      [{ color: "red" }, { color: "blue" }]
    ];
    const functions = [
      (e) => e > 50,
      (e) => e.length > 2,
      (e) => e.color === "red"
    ];
    for (let i = 0; i < 3; i++)
      expect(some(arrays[i], functions[i])).toBeTruthy();
  });

  it("Should Return False If No Element Satisfied The Callback", () => {
    const arrays = [
      [2, 4, 6],
      ["A", "B", "C"],
      [{ color: "red" }, { color: "blue" }]
    ];
    const functions = [
      (e) => e % 2,
      (e) => e.length > 2,
      (e) => e.color === "green"
    ];
    for (let i = 0; i < 3; i++)
      expect(some(arrays[i], functions[i])).toBeFalsy();
  });

  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        some(item, (e) => !!e);
      }).toThrow(`${item} Is Not An Array`);
    }
  });

  it("Shoule Accept Only Function As Second Parameter", () => {
    const notFunctions = [10, true, {}, "Test", [], -Infinity];
    for (item of notFunctions) {
      expect(() => {
        some([1, 2, 3], item);
      }).toThrow(`${item} Is Not A Function`);
    }
  });

  it("Should Accept Callback With Three Parameters", () => {
    const array = [1, 2, 3, 4, 5];
    const callback = function (element, index, _) {
      return element * index === 20;
    };
    expect(some(array, callback)).toBeTruthy();
  });

  it("Accepts Third Parameter Of thisArg", () => {
    const arr = [6, 11, 25, 44, 70];
    const callbaclWithThis = function (element) {
      return element % this.modBase === 1;
    };
    const thisArg = { modBase: 5 };
    expect(some(arr, callbaclWithThis, thisArg)).toBeTruthy();
  });
});
