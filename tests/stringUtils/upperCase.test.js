const { upperCase } = require("../../js/stringUtils");
describe("String Lowercase Function", () => {
  it("Should Return String With All Letters Being UpperCase", () => {
    const strings = [
      "Amin",
      "SALEM",
      "9182",
      "M621_x",
      "zXcV",
      "*6$2Mkin",
      "[A9_-_0Z]"
    ];
    const expectedOutput = [
      "AMIN",
      "SALEM",
      "9182",
      "M621_X",
      "ZXCV",
      "*6$2MKIN",
      "[A9_-_0Z]"
    ];
    for (let i = 0; i < strings.length; i++) {
      expect(upperCase(strings[i])).toBe(expectedOutput[i]);
    }
  });
  it("Should Throw TypeError When Non-String Value Is Passed", () => {
    const nonStrings = [null, {}, [1, 2], true, 11, NaN, Infinity, (x) => x];
    for (item of nonStrings) expect(() => upperCase(item)).toThrow();
  });
  it("Should Return Empty String If Nothing Is Passed", () => {
    expect(upperCase()).toBe("");
  });
});
