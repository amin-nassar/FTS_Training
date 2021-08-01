const { format } = require("../../js/format");
describe("Date Format Function", () => {
  it("Should Return String Of Formatted Date", () => {
    const formats = [
      "DD.MMMM.yy",
      "d.MM.yy",
      "DD.y",
      "MMM DD y HH mm SS aa",
      "HH:mm:ss a",
      "y-M-d h.m.s AA",
      "M / MM / MMM / MMMM / A"
    ];
    const wantedDate = new Date("12-05-2020 14:45:30Z");
    const expectedOutput = [
      "05.December.20",
      "5.12.20",
      "05.2020",
      "Dec 05 2020 14 45 30 pm",
      "14:45:30 p",
      "2020-12-5 14.45.30 PM",
      "12 / 12 / Dec / December / P"
    ];
    for (let i = 0; i < formats.length; i++) {
      expect(format(wantedDate, formats[i])).toEqual(expectedOutput[i]);
    }
  });
  it("Should Throw Error If Parameters' Types Are Incorrect", () => {
    const invalidValues = [true, {}, [], 10, null, undefined];
    for (item of invalidValues) {
      expect(() => format(new Date(), item)).toThrow("Invalid Format Type");
      expect(() => format(item, "format")).toThrow("Invalid Date");
    }
  });
  it("Should Throw Error If There's Missing Parameter", () => {
    expect(() => format(new Date())).toThrow();
    expect(() => format()).toThrow();
  });
  it("Should Throw Error If The Format Isn't Valid", () => {
    const invalidFormats = ["MIM.xyz", "10.20.30", "_FD_FM_FY_"];
    for (item of invalidFormats)
      expect(() => format(new Date(), item)).toThrow();
  });
});
