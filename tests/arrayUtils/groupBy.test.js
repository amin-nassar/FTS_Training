const { groupBy } = require("../../js/arrayUtils");
describe("Array GroupBy Function", () => {
  it("Should Return Object With Elements Grouped In It In Arrays", () => {
    const arrays = [
      ["one", "two", "three", "four", "five"],
      [10.5, 5.6, 10.9, 4.5, 5.2, 10.65],
      [1, 2, 3, 4, 5]
    ];
    const iteratees = ["length", Math.floor, (e) => e % 2];
    const expectedOutput = [
      { 3: ["one", "two"], 5: ["three"], 4: ["four", "five"] },
      { 10: [10.5, 10.9, 10.65], 5: [5.6, 5.2], 4: [4.5] },
      { 1: [1, 3, 5], 0: [2, 4] }
    ];
    for (let i = 0; i < arrays.length; i++) {
      expect(groupBy(arrays[i], iteratees[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Accept Both String Key & Callback Function", () => {
    const array = [
      { name: "Amin", age: 24 },
      { name: "Ali", age: 25 },
      { name: "Amin", age: 25 },
      { name: "Ali", age: 24 }
    ];
    const iteratees = ["name", (e) => e.age];
    const expectedOutput = [
      {
        Amin: [
          { name: "Amin", age: 24 },
          { name: "Amin", age: 25 }
        ],
        Ali: [
          { name: "Ali", age: 25 },
          { name: "Ali", age: 24 }
        ]
      },
      {
        24: [
          { name: "Amin", age: 24 },
          { name: "Ali", age: 24 }
        ],
        25: [
          { name: "Ali", age: 25 },
          { name: "Amin", age: 25 }
        ]
      }
    ];
    for (let i = 0; i < iteratees.length; i++) {
      expect(groupBy(array, iteratees[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Returns Object With Array Elements If The Second Parameter Isn't Provided", () => {
    const array = ["one", "two", "three"];
    const expectedOutput = { one: "one", two: "two", three: "three" };
    expect(groupBy(array)).toEqual(expectedOutput);
  });
  it("Should Accept Only Array As The First Parameter", () => {
    const notArrays = [10, true, {}, "Test", function () {}, -Infinity];
    for (item of notArrays) {
      expect(() => {
        groupBy(item, "key");
      }).toThrow(`${item} Is Not An Array`);
    }
  });
});
