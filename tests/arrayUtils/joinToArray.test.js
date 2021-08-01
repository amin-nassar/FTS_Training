const { joinToArray } = require("../../js/arrayUtils");
describe("Array JoinToArray Function", () => {
  it("Should Return Array With The Value Between Each 2 Elements", () => {
    const arrays = [
      [1, 2, 3],
      ["Hi", "Bye", "Welcome"],
      [true, false, true],
      [
        [1, 2],
        [3, 4],
        [5, 6]
      ],
      [{ val: 1 }, { val: 2 }]
    ];
    const values = ["K", [], 10, null, true];
    const expectedOutput = [
      [1, "K", 2, "K", 3],
      ["Hi", [], "Bye", [], "Welcome"],
      [true, 10, false, 10, true],
      [[1, 2], null, [3, 4], null, [5, 6]],
      [{ val: 1 }, true, { val: 2 }]
    ];

    for (let i = 0; i < arrays.length; i++) {
      expect(joinToArray(arrays[i], values[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        joinToArray(item, "");
      }).toThrow(`${item} Is Not An Array`);
    }
  });
  it("Returns New Array & Not Modify The Original One", () => {
    const original = [1, 2, 3];
    const output = joinToArray(original, true);
    expect(output).not.toEqual(original);
    expect(output).not.toBe(original);
  });
});
