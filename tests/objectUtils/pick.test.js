const { pick } = require("../../js/objectUtils");
describe("Object Pick Function", () => {
  it("Should Return Object Containing The Picked Keys & Values", () => {
    const objects = [
      { name: "Amin", age: 10 },
      { a: 1, b: 2, 1: 15 },
      [1, 2, 3],
      "String"
    ];
    const pickedKeys = ["name", ["a", "b"], [0, 2], [5]];
    const expectedOutput = [
      { name: "Amin" },
      { a: 1, b: 2 },
      { 0: 1, 2: 3 },
      { 5: "g" }
    ];
    for (let i = 0; i < objects.length; i++) {
      expect(pick(objects[i], pickedKeys[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Accept The Key Being A String Or Array Of Strings", () => {
    const object = { name: "Amin", age: 21, gender: "Male" };
    expect(pick(object, "name")).toEqual({ name: "Amin" });
    expect(pick(object, ["age", "gender"])).toEqual({
      age: 21,
      gender: "Male"
    });
  });
  it("Should Return Empty Object If No Real Object Is Passed", () => {
    expect(pick(10, 0)).toEqual({});
    expect(pick(NaN, 0)).toEqual({});
    expect(pick(true, 0)).toEqual({});
  });

  it("Should Return Empty Object If No Keys Are Picked", () => {
    expect(pick({ a: 1 })).toEqual({});
  });
  it("Should Return Empty Object If Nothing Is Passed", () => {
    expect(pick()).toEqual({});
  });

  it("Should Return Empty Object If The Object Is Null", () => {
    expect(pick(null, "test")).toEqual({});
    expect(pick(null)).toEqual({});
  });
});
