const { map } = require("../../js/arrayUtils");
describe("Array Map Function", () => {
  it("Should Map Function To Array", () => {
    const arrays = [
      [1, 2, 3, 4, 5],
      ["hi", "bye", "good", "hood"],
      [{ value: 1 }, { value: 2 }],
      [true, false, true, true],
      [
        [1, 2, 3],
        [1, 2, 3, 4]
      ]
    ];
    const functions = [
      (e) => e + 1,
      (e) => e.toUpperCase(),
      (e) => e.value,
      (e) => !e,
      (e) => e.length
    ];
    const expectedOutput = [
      [2, 3, 4, 5, 6],
      ["HI", "BYE", "GOOD", "HOOD"],
      [1, 2],
      [false, true, false, false],
      [3, 4]
    ];
    for (let i = 0; i < arrays.length; i++) {
      expect(map(arrays[i], functions[i])).toEqual(expectedOutput[i]);
    }
  });

  it("Shoud Accept Callback With Three Parameters", () => {
    const arr = [1, 2];
    const callback = function (element, index, array) {
      return element + index + array.length;
    };
    expect(map(arr, callback)).toEqual([3, 5]);
  });

  it("Shoule Accept Only Array As First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        map(item, (e) => e);
      }).toThrow(`${item} Is Not An Array`);
    }
  });

  it("Shoule Accept Only Function As Second Parameter", () => {
    const notFunctions = [10, true, {}, "Test", [], -Infinity];
    for (item of notFunctions) {
      expect(() => {
        map([1, 2, 3], item);
      }).toThrow(`${item} Is Not A Function`);
    }
  });

  it("Returns New Array & Not Modify The Original One", () => {
    const original = [1, 2, 3];
    const callback = (e) => e * e;
    const output = map(original, callback);
    expect(output).not.toEqual(original);
    expect(output).not.toBe(original);
  });

  it("Accepts Third Parameter Of thisArg", () => {
    const arr = [{ age: 14 }, { age: 20 }];
    const callbaclWithThis = function (element) {
      return { age: element.age - this.value };
    };
    const thisArg = { value: 2 };
    expect(map(arr, callbaclWithThis, thisArg)).toEqual([
      { age: 12 },
      { age: 18 }
    ]);
  });
});
