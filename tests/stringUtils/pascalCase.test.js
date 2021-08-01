const { pascalCase } = require("../../js/stringUtils");

describe("String Pascal Case Function", () => {
  it("Should Return String In Pascal Case Format", () => {
    const strings = [
      "__user_name__",
      "--user---name-",
      "USER_NAME",
      " userName ",
      "userName",
      "User.Name",
      "$user%Name#"
    ];
    for (string of strings) expect(pascalCase(string)).toBe("userName");
  });
  it("Should Return The Same String If It's Lowercase", () => {
    expect(pascalCase("age")).toBe("age");
  });
  it("Should Throw TypeError When Non-String Value Is Passed", () => {
    const nonStrings = [null, {}, [1, 2], true, 11, NaN, Infinity, (x) => x];
    for (item of nonStrings) expect(() => pascalCase(item)).toThrow();
  });
  it("Should Return Empty String If Nothing Is Passed", () => {
    expect(pascalCase()).toBe("");
  });
});
