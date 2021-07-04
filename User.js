// Constructor Function
// Array Destructuring Used To Get User Information
function User([
  id,
  firstName,
  lastName,
  email,
  gender,
  ipAddress,
  color,
  parentId
]) {
  [this.id, this.parentId] = [+id, +parentId];
  [this.firstName, this.lastName] = [firstName, lastName];
  this.email = email;
  this.gender = gender;
  this.ipAddress = ipAddress;
  this.color = color;
}

module.exports = User;
