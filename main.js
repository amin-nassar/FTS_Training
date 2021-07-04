// Get Modules
const fs = require("fs");
const User = require("./User");

// Take Line Of Comma Separated Values => Return User Object
function createNewUser(lineOfData) {
  const newUser = new User(lineOfData.split(","));
  return newUser;
}

// Take Lines Of Data => Returns Array Of User Objects
function createUsersArray(linesOfData) {
  const users = [];
  linesOfData.forEach((line) => users.push(createNewUser(line)));
  return users;
}

// Take The Data File => Return Array Of Lines Of Comma Separated Values
function readPlain(fileName) {
  const csv = fs.readFileSync(fileName, "utf8");
  const lines = csv
    .split("\n")
    .map((e) => e.trim())
    .slice(1);
  return lines;
}

// Take Output File & Array Of Users => Write JSON ON The File
function saveToFile(fileName, users) {
  const jsonData = JSON.stringify(users);
  fs.writeFileSync(fileName, jsonData);
}

// Take The Output File => Read It & Log It On The Screen
function readJSONfile(fileName) {
  const jsonData = fs.readFileSync(fileName, "utf8");
  console.log(jsonData);
}

// Main Function That Runs The Whole Code
function main() {
  const linesOfData = readPlain("MOCK_DATA.csv");
  const usersArray = createUsersArray(linesOfData);
  saveToFile("output.json", usersArray);
  readJSONfile("output.json");
}

main();
