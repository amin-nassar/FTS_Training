const { values } = require("../../js/objectUtils");
describe("Object Values Function", () => {
  it("Should Return Array Of Values In The Passed Object", () => {
    const objects = [
      { name: "Amin", age: 10 },
      { a: 1, b: 2, 1: 15 },
      [1, 2, 3],
      "String"
    ];
    const expectedOutput = [
      ["Amin", 10],
      [15, 1, 2],
      [1, 2, 3],
      ["S", "t", "r", "i", "n", "g"]
    ];
    for (let i = 0; i < objects.length; i++) {
      expect(values(objects[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Return Empty Array If No Real Object Is Passed", () => {
    expect(values(10)).toEqual([]);
    expect(values(1.5)).toEqual([]);
    expect(values(true)).toEqual([]);
  });
  it("Should Throw Error If Null Or Undefined Passed", () => {
    expect(() => values(null)).toThrow(`Cannot convert null to object`);
    expect(() => values(undefined)).toThrow(
      `Cannot convert undefined to object`
    );
    expect(() => values()).toThrow(`Cannot convert undefined to object`);
  });
});
