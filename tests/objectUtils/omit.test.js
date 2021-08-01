const { omit } = require("../../js/objectUtils");
describe("Object Omit Function", () => {
  it("Should Return Object With All Keys Accept The Omitted Ones", () => {
    const objects = [
      { name: "Amin", age: 10 },
      { a: 1, b: 2, 1: 15 },
      [1, 2, 3],
      "String"
    ];
    const pickedKeys = ["name", ["a", "b"], [0, 2], [1, 3, 5]];
    const expectedOutput = [
      { age: 10 },
      { 1: 15 },
      { 1: 2 },
      { 0: "S", 2: "r", 4: "n" }
    ];
    for (let i = 0; i < objects.length; i++) {
      expect(omit(objects[i], pickedKeys[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Accept The Key Being A String Or Array Of Strings", () => {
    const object = { name: "Amin", age: 21, gender: "Male" };
    expect(omit(object, "name")).toEqual({
      age: 21,
      gender: "Male"
    });
    expect(omit(object, ["age", "gender"])).toEqual({ name: "Amin" });
  });
  it("Should Return Empty Object If No Real Object Is Passed", () => {
    expect(omit(10, 0)).toEqual({});
    expect(omit(NaN, 0)).toEqual({});
    expect(omit(true, 0)).toEqual({});
  });

  it("Should Return The Same Object If No Keys Are Omitted", () => {
    expect(omit({ a: 1 })).toEqual({ a: 1 });
  });
  it("Should Return Empty Object If Nothing Is Passed", () => {
    expect(omit()).toEqual({});
  });

  it("Should Return Empty Object If The Object Is Null", () => {
    expect(omit(null, "test")).toEqual({});
    expect(omit(null)).toEqual({});
  });
});
