const { keys } = require("../../js/objectUtils");
describe("Object Keys Function", () => {
  it("Should Return Array Of Keys In The Passed Object", () => {
    const objects = [
      { name: "Amin", age: 10 },
      { a: 1, b: 2, 1: 15 },
      [1, 2, 3],
      "String"
    ];
    const expectedOutput = [
      ["name", "age"],
      ["1", "a", "b"],
      ["0", "1", "2"],
      ["0", "1", "2", "3", "4", "5"]
    ];
    for (let i = 0; i < objects.length; i++) {
      expect(keys(objects[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Return Empty Array If No Real Object Is Passed", () => {
    expect(keys(10)).toEqual([]);
    expect(keys(1.5)).toEqual([]);
    expect(keys(true)).toEqual([]);
  });
  it("Should Throw Error If Null Or Undefined Passed", () => {
    expect(() => keys(null)).toThrow(`Cannot convert null to object`);
    expect(() => keys(undefined)).toThrow(`Cannot convert undefined to object`);
    expect(() => keys()).toThrow(`Cannot convert undefined to object`);
  });
});
