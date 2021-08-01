const { flatten } = require("../../js/arrayUtils");
describe("Array Flatten Function", () => {
  it("Should Return Array That Has No Array Elements", () => {
    const arrays = [
      [1, [2, 3], [4, 5]],
      [1, 2, 3, 4, 5],
      [1, [2, 3, [4, 5]]],
      [1, [2, [3, [4, [5]]]]]
    ];
    const expectedOutput = [1, 2, 3, 4, 5];
    for (let array of arrays) expect(flatten(array)).toEqual(expectedOutput);
  });
  it("Should Accept Only Array As A Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        flatten(item);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Returns New Array & Not Modify The Original One", () => {
    const original = [
      [1, 2],
      [3, 4],
      [5, 6, [7]]
    ];
    const output = flatten(original);
    expect(output).not.toEqual(original);
    expect(output).not.toBe(original);
  });
});
