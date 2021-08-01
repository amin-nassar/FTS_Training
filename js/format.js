class Getter {
  constructor(date) {
    this.date = date;
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  }
  zeroFill(value) {
    return `${value > 9 ? "" : "0"}${value}`;
  }
  y() {
    return this.date.getUTCFullYear().toString();
  }
  yy() {
    return this.date.getUTCFullYear().toString().substr(-2);
  }
  M() {
    return String(this.date.getUTCMonth() + 1);
  }
  MM() {
    return this.zeroFill(this.M());
  }
  MMM() {
    return this.MMMM().substring(0, 3);
  }
  MMMM() {
    return this.months[this.date.getUTCMonth()];
  }
  d() {
    return this.date.getUTCDate();
  }
  dd() {
    return this.zeroFill(this.d());
  }
  h() {
    return this.date.getUTCHours();
  }
  hh() {
    return this.zeroFill(this.h());
  }
  m() {
    return this.date.getUTCMinutes();
  }
  mm() {
    return this.zeroFill(this.m());
  }
  s() {
    return this.date.getUTCSeconds();
  }
  ss() {
    const seconds = this.s();
    return this.zeroFill(this.s());
  }
  a() {
    return this.AA().charAt(0).toLowerCase();
  }
  A() {
    return this.AA().charAt(0);
  }
  aa() {
    return this.AA().toLowerCase();
  }
  AA() {
    const hours = this.h();
    return hours > 12 ? "PM" : "AM";
  }
}

function tokenizeFormat(formatString, separatorRegExp) {
  return formatString
    .replace(/[SYDH]/g, (match) => match.toLowerCase())
    .replace(separatorRegExp, "/")
    .split("/");
}

function format(date, formatString) {
  if (!(date instanceof Date)) throw new Error("Invalid Date");
  if (typeof formatString !== "string") throw new Error("Invalid Format Type");
  const regExp = new RegExp(/[:\\\.\/-\s]+/g);
  const tokens = tokenizeFormat(formatString, regExp);
  const matches = formatString.match(regExp);
  const getter = new Getter(date);
  let outputString = "";
  for (let i = 0; i < matches.length; i++) {
    const getFunction = getter[tokens[i]];
    outputString += getFunction.call(getter) + matches[i];
  }
  const lastToken = tokens[tokens.length - 1];
  const getFunction = getter[lastToken];
  outputString += getFunction.call(getter);
  return outputString;
}

module.exports.format = format;
