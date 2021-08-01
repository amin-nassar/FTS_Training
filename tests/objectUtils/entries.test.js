const { entries } = require("../../js/objectUtils");
describe("Object Entries Function", () => {
  it("Should Return Array Of Entries In The Passed Object", () => {
    const objects = [
      { name: "Amin", age: 10 },
      { a: 1, b: 2, 1: 15 },
      [1, 2, 3],
      "String"
    ];
    const expectedOutput = [
      [
        ["name", "Amin"],
        ["age", 10]
      ],
      [
        ["1", 15],
        ["a", 1],
        ["b", 2]
      ],
      [
        ["0", 1],
        ["1", 2],
        ["2", 3]
      ],
      [
        ["0", "S"],
        ["1", "t"],
        ["2", "r"],
        ["3", "i"],
        ["4", "n"],
        ["5", "g"]
      ]
    ];
    for (let i = 0; i < objects.length; i++) {
      expect(entries(objects[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Return Empty Array If No Real Object Is Passed", () => {
    expect(entries(10)).toEqual([]);
    expect(entries(1.5)).toEqual([]);
    expect(entries(true)).toEqual([]);
  });
  it("Should Throw Error If Null Or Undefined Passed", () => {
    expect(() => entries(null)).toThrow(`Cannot convert null to object`);
    expect(() => entries(undefined)).toThrow(
      `Cannot convert undefined to object`
    );
    expect(() => entries()).toThrow(`Cannot convert undefined to object`);
  });
});
