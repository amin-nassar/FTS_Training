const { removeDuplicates } = require("../../js/arrayUtils");

describe("Array Remove Duplicates Function", () => {
  it("Should Accept Array As First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        removeDuplicates(item);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Should Return Array With Distinct Elements", () => {
    const arrays = [
      [1, 2, 3, 4, 2, 3, 6, 4, 5, 6, 3, 2, 4],
      [true, 10, "Test", false, true, "Test"],
      ["Ali", "Hamed", "Ali", "Hamed"]
    ];
    const expectedOutput = [
      [1, 2, 3, 4, 6, 5],
      [true, 10, "Test", false],
      ["Ali", "Hamed"]
    ];
    for (let i = 0; i < arrays.length; i++)
      expect(removeDuplicates(arrays[i])).toEqual(expectedOutput[i]);
  });
  it("Returns New Array & Not Modify The Original One", () => {
    const original = [1, 2, 3, 4, 3, 1, 5, 6, 2];
    const output = removeDuplicates(original);
    expect(output).not.toEqual(original);
    expect(output).not.toBe(original);
  });
  it("Should Accept Single Key As Second Parameter", () => {
    const array = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 0 }];
    const key = "a";
    expect(removeDuplicates(array, key)).toEqual([
      { a: 1 },
      { a: 2 },
      { a: 0 }
    ]);
  });
  it("Should Accept 2 Keys As Second Parameter", () => {
    const array = [
      { a: { b: 1 } },
      { a: { b: 2 } },
      { a: { b: 2 } },
      { a: { b: 0 } }
    ];
    const key = "a.b";
    expect(removeDuplicates(array, key)).toEqual([
      { a: { b: 1 } },
      { a: { b: 2 } },
      { a: { b: 0 } }
    ]);
  });
  it("Should Accept Any Number Of Keys As Second Parameter", () => {
    const array = [
      { a: { b: { c: 1 } } },
      { a: { b: { c: 2 } } },
      { a: { b: { c: 2 } } },
      { a: { b: { c: 0 } } }
    ];
    const key = "a.b.c";
    expect(removeDuplicates(array, key)).toEqual([
      { a: { b: { c: 1 } } },
      { a: { b: { c: 2 } } },
      { a: { b: { c: 0 } } }
    ]);
  });
});
