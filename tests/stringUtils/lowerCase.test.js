const { lowerCase } = require("../../js/stringUtils");
describe("String Lowercase Function", () => {
  it("Should Return String With All Letters Being Lowercase", () => {
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
      "amin",
      "salem",
      "9182",
      "m621_x",
      "zxcv",
      "*6$2mkin",
      "[a9_-_0z]"
    ];
    for (let i = 0; i < strings.length; i++) {
      expect(lowerCase(strings[i])).toBe(expectedOutput[i]);
    }
  });
  it("Should Throw TypeError When Non-String Value Is Passed", () => {
    const nonStrings = [null, {}, [1, 2], true, 11, NaN, Infinity, (x) => x];
    for (item of nonStrings) expect(() => lowerCase(item)).toThrow();
  });
  it("Should Return Empty String If Nothing Is Passed", () => {
    expect(lowerCase()).toBe("");
  });
});
