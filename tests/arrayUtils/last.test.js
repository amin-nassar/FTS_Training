const { last } = require("../../js/arrayUtils");
describe("Array Last Function", () => {
  it("Should Return The Last Element Of The Array", () => {
    expect(last([1, 2, 3, 4])).toBe(4);
    expect(last([true, false, 10, "Test"])).toBe("Test");
  });
  it("Should Return Undefined For Empty Array", () => {
    expect(last([])).toBeUndefined();
  });
  it("Should Accept Only Array As A Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        last(item);
      }).toThrow(`${item} Is Not An Array`);
    }
  });
});
