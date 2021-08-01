const { reverse } = require("../../js/arrayUtils");
describe("Array Reverse Function", () => {
  it("Should Return Reverse Array", () => {
    const arrays = [
      [1, 2, 3, 4],
      ["One", [], null, [false], true, { one: 1 }, {}, 19]
    ];
    const expectedOutput = [
      [4, 3, 2, 1],
      [19, {}, { one: 1 }, true, [false], null, [], "One"]
    ];
    for (let i = 0; i < arrays.length; i++) {
      expect(reverse(arrays[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Accept Only Array As A Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        reverse(item);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Returns New Array & Not Modify The Original One", () => {
    const original = [1, 2, 3, 4];
    const output = reverse(original);
    expect(output).not.toEqual(original);
    expect(output).not.toBe(original);
  });
});
