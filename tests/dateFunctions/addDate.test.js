const { add } = require("../../js/addDate");
describe("Date Add Function", () => {
  it("Should Return The Epoch When Called Without Parameters", () => {
    expect(add()).toEqual(new Date(0));
  });
  it("Should Return The Passed Date If No Amount Was Passed", () => {
    const date = new Date("01-15-2000Z");
    expect(add(date)).toEqual(date);
    expect(add(date)).not.toBe(date);
  });
  it("Should Return New Dated Combined Of Passed Date & Amount", () => {
    const amounts = ["10d", "5h", "22h", "24h", "30d", "7d"];
    const date = new Date("01-15-2000 06:30:00Z");
    const expectedOutput = [
      new Date("01-25-2000 06:30:00Z"),
      new Date("01-15-2000 11:30:00Z"),
      new Date("01-16-2000 04:30:00Z"),
      new Date("01-16-2000 06:30:00Z"),
      new Date("02-14-2000 06:30:00Z"),
      new Date("01-22-2000 06:30:00Z")
    ];
    for (let i = 0; i < amounts.length; i++) {
      expect(add(date, amounts[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Throw An Error If The Parameters' Types Are Incorrect", () => {
    const invalidValues = [true, {}, [], 10, NaN, null, undefined];
    for (item of invalidValues) {
      expect(() => add(item, "10d")).toThrow(`${item} Is Invalid Date`);
      expect(() => add(new Date(), item)).toThrow(`${item} Is Not String`);
    }
  });
  it("Should Throw An Error If The Passed Amount Is Not Valid", () => {
    expect(() => add(new Date(), "test")).toThrow(`test Is Not Valid Amount`);
    expect(() => add(new Date(), "20W")).toThrow(`20W Is Not Valid Amount`);
  });
});
