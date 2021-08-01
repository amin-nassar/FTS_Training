class Setter {
  constructor() {
    this.date = new Date(0);
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
  getDate() {
    return this.date;
  }
  checkNumber(num) {
    if (isNaN(+num)) throw new Error("Invalid Date");
  }
  y(value) {
    this.checkNumber(value);
    this.date.setUTCFullYear(value);
  }
  yy(value) {
    this.checkNumber(value);
    const fullYear = value > 70 ? `19${value}` : `20${value}`;
    this.y(parseInt(fullYear));
  }
  M(value) {
    this.checkNumber(value);
    if (value < 1 || value > 12) throw new Error("Invalid Date");
    this.date.setUTCMonth(value - 1);
  }
  MM(value) {
    this.checkNumber(value);
    const re = RegExp(/[0-9]{2}/g);
    if (!re.test(value)) throw new Error("Invalid Date");
    else this.M(value);
  }
  MMM(value) {
    const monthIndex = this.months.findIndex((m) => m.startsWith(value));
    if (monthIndex === -1) throw new Error("Invalid Date");
    else this.date.setUTCMonth(monthIndex);
  }
  MMMM(value) {
    const monthIndex = this.months.findIndex((m) => m === value);
    if (monthIndex === -1) throw new Error("Invalid Date");
    else this.date.setUTCMonth(monthIndex);
  }
  d(value) {
    this.checkNumber(value);
    if (+value < 1 || +value > 31) throw new Error("Invalid Date");
    this.date.setUTCDate(value);
  }
  dd(value) {
    this.checkNumber(value);
    const re = RegExp(/[0-9]{2}/g);
    if (!re.test(value)) throw new Error("Invalid Date");
    else this.d(value);
  }
  h(value) {
    this.checkNumber(value);
    if (value < 0 || value > 23) throw new Error("Invalid Date");
    else this.date.setUTCHours(value);
  }
  hh(value) {
    this.checkNumber(value);
    const re = RegExp(/[0-9]{2}/g);
    if (!re.test(value)) throw new Error("Invalid Date");
    else this.h(value);
  }
  m(value) {
    this.checkNumber(value);
    if (value < 0 || value > 59) throw new Error("Invalid Date");
    else this.date.setUTCMinutes(value);
  }
  mm(value) {
    this.checkNumber(value);
    const re = RegExp(/[0-9]{2}/g);
    if (!re.test(value)) throw new Error("Invalid Date");
    else this.m(value);
  }
  s(value) {
    this.checkNumber(value);
    if (value < 0 || value > 59) throw new Error("Invalid Date");
    else this.date.setUTCSeconds(value);
  }
  ss(value) {
    this.checkNumber(value);
    const re = RegExp(/[0-9]{2}/g);
    if (!re.test(value)) throw new Error("Invalid Date");
    else this.s(value);
  }
  ampm(value) {
    const hours = this.date.getHours();
    let newHours = hours % 12;
    if (/pm?/g.test(value.toLowerCase())) newHours += 12;
    this.date.setHours(newHours);
  }
  a(val) {
    if (val === "a" || val === "p") this.ampm(val);
    else throw Error("Invalid Date");
  }
  A(val) {
    if (val === "A" || val === "P") this.ampm(val);
    else throw Error("Invalid Date");
  }
  AA(val) {
    if (val === "AM" || val === "PM") this.ampm(val);
    else throw Error("Invalid Date");
  }
  aa(val) {
    if (val === "am" || val === "pm") this.ampm(val);
    else throw Error("Invalid Date");
  }
}
function tokenizeFormat(formatString) {
  return formatString
    .replace(/[SYDH]/g, (match) => match.toLowerCase())
    .replace(/[:\\\.\/-\s]+/g, "/")
    .split("/");
}
function tokenizeValues(dateString) {
  return dateString.replace(/[:\\\.\/-\s]+/g, "/").split("/");
}

function isArgumentsValid(args, number, type) {
  const checkLength = args.length === number;
  const checkType = Array.from(args).every((e) => typeof e === type);
  return checkLength && checkType;
}

function isFormatValid(dateString, formatString) {
  const regExp = new RegExp(/[:\\\.\/-\s]+/g);
  const dateMatch = dateString.match(regExp);
  const formatMatch = formatString.match(regExp);
  if (dateMatch.length !== formatMatch.length) return false;
  for (let i = 0; i < dateMatch.length; i++)
    if (dateMatch[i] !== formatMatch[i]) return false;
  return true;
}

function fromFormat(dateString, formatString) {
  const setter = new Setter();
  if (!isArgumentsValid(arguments, 2, "string")) return setter.getDate();
  if (!isFormatValid(dateString, formatString))
    throw new Error("Invalid Format");
  const formatTokens = tokenizeFormat(formatString);
  const formatNumers = tokenizeValues(dateString);
  for (let i = 0; i < formatTokens.length; i++) {
    setter[formatTokens[i]](formatNumers[i]);
  }
  return setter.getDate();
}

module.exports.fromFormat = fromFormat;
