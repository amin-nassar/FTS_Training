function isValidAmount(amount) {
  const regEx = new RegExp(/[0-9]{1,}(d|h)/);
  return regEx.test(amount) && !isNaN(parseInt(amount));
}
function add(date, amount) {
  if (arguments.length === 0) return new Date(0);
  if (!(date instanceof Date)) throw new Error(`${date} Is Invalid Date`);
  if (amount === undefined && arguments.length == 1) return new Date(date);
  if (typeof amount !== "string") throw new Error(`${amount} Is Not String`);
  if (!isValidAmount(amount)) throw new Error(`${amount} Is Not Valid Amount`);
  const value = parseInt(amount);
  const type = amount.charAt(amount.length - 1);
  const outputDate = new Date(date);
  if (type.toLowerCase() === "h") outputDate.setHours(date.getHours() + value);
  if (type.toLowerCase() === "d") outputDate.setDate(date.getDate() + value);
  return outputDate;
}
module.exports.add = add;
