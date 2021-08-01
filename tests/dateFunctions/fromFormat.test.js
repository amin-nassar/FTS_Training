const { fromFormat } = require("../../js/fromFormat");

describe("Date From Format Function", () => {
  it("Should Return The Epoch If Parameters Aren't Full", () => {
    expect(fromFormat()).toEqual(new Date(0));
    expect(fromFormat("Date String Only")).toEqual(new Date(0));
  });
  it("Should Return The Epoch If One Of Parameters Isn't String", () => {
    expect(fromFormat(true, "Format String")).toEqual(new Date(0));
    expect(fromFormat([], "Format String")).toEqual(new Date(0));
    expect(fromFormat("Date String", {})).toEqual(new Date(0));
    expect(fromFormat(10, "Format String")).toEqual(new Date(0));
    expect(fromFormat("Date String", NaN)).toEqual(new Date(0));
  });

  it("Should Return Date From The String Format", () => {
    const dateStrings = [
      "05.6.20",
      "22-11-2016",
      "1/Jun/2012",
      "30/March.80",
      "10.10.20 6:30:00",
      "20-Dec/99:07.05:20 am",
      "11-October/10:04.50.30 PM",
      "8-Jul/2000:07-30.15 A",
      "20./.Dec./.99./.17./.25./.25./.p"
    ];
    const formatStrings = [
      "DD.M.YY",
      "dd-MM-y",
      "d/MMM/Y",
      "DD/MMMM.YY",
      "dd.MM.yy h:mm:SS",
      "DD-MMM/yy:HH.mm:ss aa",
      "dd-MMMM/yy:hh.mm.SS AA",
      "D-MMM/Y:HH-mm.Ss A",
      "dd./.MMM./.YY./.HH./.mm./.ss./.a"
    ];
    const expectedOutput = [
      new Date("2020-06-05"),
      new Date("2016-11-22"),
      new Date("2012-06-01"),
      new Date("1980-03-30"),
      new Date("2020-10-10T06:30:00Z"),
      new Date("1999-12-20T07:05:20Z"),
      new Date("2010-10-11T16:50:30Z"),
      new Date("2000-07-08T07:30:15Z"),
      new Date("1999-12-20T17:25:25Z")
    ];
    for (let i = 0; i < expectedOutput.length; i++) {
      const outputDate = fromFormat(dateStrings[i], formatStrings[i]);
      expect(outputDate).toEqual(expectedOutput[i]);
    }
  });
  it("Should Throw An Error If The Format Or Date String Is Invalid", () => {
    const dateStrings = [
      "10.10.20",
      "11-6/2015",
      "9-4-99 05.10.20 PM",
      "10.Jun.20",
      "5-10-2015",
      "10.10.10 5:5:5 AI",
      "15:30:00 xz",
      "20.05.1999 15 abc",
      "20 16 tx",
      "20/March/99/11/45/33/V",
      "30-20-35",
      "20/75/35",
      "05.30.60"
    ];
    const formatStrings = [
      "DD.MM.YY HH:mm:ss aa",
      "dd/M.y",
      "DD.MM.y",
      "DD.MMMM.YY",
      "dd-MM-y",
      "dd.MM.yy hh:mm:SS A",
      "hh:mm:ss aa",
      "dd.MM.y hh AA",
      "dd hh a",
      "dd/MMMM/YY/HH/mm/SS/A",
      "hh-mm-ss",
      "hh/mm/ss",
      "hh.mm.ss"
    ];
    for (let i = 0; i < dateStrings.length; i++) {
      const throwingFunction = () =>
        fromFormat(dateStrings[i], formatStrings[i]);
      expect(throwingFunction).toThrow();
    }
  });
  it("Should Throw An Error If Desired Date Is Invalid", () => {
    const dateStrings = ["42.06.2500", "11-16/2015", "JU/OI/2020"];
    const formatStrings = ["DD.MM.YY", "dd-M/y", "DD/MM/2050"];
    for (let i = 0; i < dateStrings.length; i++) {
      const throwingFunction = () =>
        fromFormat(dateStrings[i], formatStrings[i]);
      expect(throwingFunction).toThrow("Invalid Date");
    }
  });
});
