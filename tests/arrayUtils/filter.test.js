const { filter } = require("../../js/arrayUtils");
describe("Array Filter Function", () => {
  it("Should Filter Array Element According To The Callback Result", () => {
    const arrays = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      ["Amin", "Ameer", "Rawan", "Hadeel", "Ali"],
      [{ age: 16 }, { age: 18 }, { age: 25 }],
      [
        [1, 2, 3],
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5]
      ]
    ];
    const functions = [
      (e) => !(e % 2),
      (e) => e.length > 4,
      (e) => e.age >= 18,
      (e) => e.length === 4
    ];
    const expectedOutput = [
      [2, 4, 6, 8],
      ["Ameer", "Rawan", "Hadeel"],
      [{ age: 18 }, { age: 25 }],
      [[1, 2, 3, 4]]
    ];
    for (let i = 0; i < arrays.length; i++) {
      expect(filter(arrays[i], functions[i])).toEqual(expectedOutput[i]);
    }
  });

  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        filter(item, (e) => e);
      }).toThrow(`${item} Is Not An Array`);
    }
  });

  it("Shoule Accept Only Function As Second Parameter", () => {
    const notFunctions = [10, true, {}, "Test", [], -Infinity];
    for (item of notFunctions) {
      expect(() => {
        filter([1, 2, 3], item);
      }).toThrow(`${item} Is Not A Function`);
    }
  });

  it("Should Accept Callback With Three Parameters", () => {
    const array = [1, 2, 3, 4, 5];
    const callback = function (element, index, array) {
      const total = element * index - array.length;
      return total > 0;
    };
    expect(filter(array, callback)).toEqual([3, 4, 5]);
  });

  it("Returns New Array & Not Modify The Original One", () => {
    const original = [1, 2, 3, 4];
    const callback = (e) => e % 2;
    const output = filter(original, callback);
    expect(output).not.toEqual(original);
    expect(output).not.toBe(original);
  });

  it("Accepts Third Parameter Of thisArg", () => {
    const arr = [{ age: 14 }, { age: 20 }, { age: 24 }, { age: 18 }];
    const callbaclWithThis = function (element) {
      return element.age > this.min && element.age < this.max;
    };
    const thisArg = { min: 16, max: 22 };
    expect(filter(arr, callbaclWithThis, thisArg)).toEqual([
      { age: 20 },
      { age: 18 }
    ]);
  });
});
