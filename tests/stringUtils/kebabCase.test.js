const { kebabCase } = require("../../js/stringUtils");

describe("String Pascal Case Function", () => {
  it("Should Return String In Pascal Case Format", () => {
    const strings = [
      "__user__name__",
      "--user---name-",
      "USER_NAME",
      "userName",
      "User.Name",
      "$user%Name#"
    ];
    for (string of strings) expect(kebabCase(string)).toBe("user-name");
  });
  it("Should Return The Same String If It's Lowercase", () => {
    expect(kebabCase("age")).toBe("age");
  });
  it("Should Throw TypeError When Non-String Value Is Passed", () => {
    const nonStrings = [null, {}, [1, 2], true, 11, NaN, Infinity, (x) => x];
    for (item of nonStrings) expect(() => kebabCase(item)).toThrow();
  });
  it("Should Return Empty String If Nothing Is Passed", () => {
    expect(kebabCase()).toBe("");
  });
});
