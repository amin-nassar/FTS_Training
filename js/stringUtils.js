const { moduleExpression } = require("@babel/types");

function lowerCase(str) {
  if (str === undefined) return "";
  if (typeof str !== "string") throw new TypeError(`${str} Is Not A String`);
  const diff = "a".charCodeAt() - "A".charCodeAt();
  const letterArray = str.split("");
  const upperLetterArray = letterArray.map(function (letter) {
    return /[A-Z]/g.test(letter)
      ? String.fromCharCode(letter.charCodeAt() + diff)
      : letter;
  });
  return upperLetterArray.join("");
}

module.exports = { lowerCase };
