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

function upperCase(str) {
  if (str === undefined) return "";
  if (typeof str !== "string") throw new TypeError(`${str} Is Not A String`);
  const diff = "a".charCodeAt() - "A".charCodeAt();
  const letterArray = str.split("");
  const upperLetterArray = letterArray.map(function (letter) {
    if (/[a-z]/g.test(letter))
      return String.fromCharCode(letter.charCodeAt() - diff);
    else return letter;
  });
  return upperLetterArray.join("");
}

function pascalCase(str) {
  if (str === undefined) return "";
  if (typeof str !== "string") throw new TypeError(`${str} Is Not A String`);
  const capitalize = (word) => `${word[0].toUpperCase()}${word.substring(1)}`;
  const outputStr = String(str)
    .toLowerCase()
    .replace(/([^A-Za-z])+/g, " ")
    .trim()
    .split(" ")
    .map((word, index) => (index == 0 ? word : capitalize(word)))
    .join("");
  return outputStr === str.toLowerCase().trim() ? str.trim() : outputStr;
}

function kebabCase(str) {
  if (str === undefined) return "";
  if (typeof str !== "string") throw new TypeError(`${str} Is Not A String`);
  const outputStr = String(str)
    .replace(/([^A-Za-z])+/g, " ")
    .replace(/[A-Z]([a-z]+)/g, (match, i) => ` ${match}`)
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .join("-")
    .toLowerCase();
  return outputStr;
}

module.exports = { lowerCase, upperCase, pascalCase, kebabCase };
