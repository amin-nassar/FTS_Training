const { mayBe } = require("../../js/objectUtils");

describe("Object MayBe Function", () => {
  it("Should Return The Value Specified By The Key String", () => {
    const objects = [
      { address: { location: "Nablus" } },
      { a: { b: { c: 1 } } },
      "Test",
      { a: { a: null } }
    ];
    const keys = ["address.location", "a.b", "length", "a.a"];
    const expectedOutput = ["Nablus", { c: 1 }, 4, null];
    for (let i = 0; i < objects.length; i++) {
      expect(mayBe(objects[i], keys[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Return Undefined If The Key Is Invalid & No Default Value Is Passed", () => {
    expect(mayBe({ a: { b: 1 } }, "a.b.c")).toBeUndefined();
  });
  it("Should Return Undefined If Nothing Is Passed", () => {
    expect(mayBe()).toBeUndefined();
  });
  it("Should Return Undefined If Onlu Object Is Passed", () => {
    expect(mayBe({ a: 1 })).toBeUndefined();
  });
  it("Should Return The Default Value If Provided & Key Is Invalid", () => {
    expect(mayBe({ a: { b: 1 } }, "a.b.c", 25)).toBe(25);
  });

  it("Should Return Undefined If The First Parameter Is Not Object", () => {
    // Th Default Value Is Not Provided
    expect(mayBe(true, "a.b.c")).toBeUndefined();
    expect(mayBe(10, "test.length")).toBeUndefined();
    expect(mayBe(NaN, "test.length")).toBeUndefined();
    expect(mayBe(null, "test.length")).toBeUndefined();
  });

  it("Should Return Default Value If The First Parameter Is Not Object", () => {
    // Th Default Value Is  Provided
    expect(mayBe(true, "a.b.c", 11)).toBe(11);
    expect(mayBe(10, "test.length", 22)).toBe(22);
    expect(mayBe(NaN, "test.length", 15)).toBe(15);
    expect(mayBe(null, "test.length", null)).toBeNull();
  });
});
