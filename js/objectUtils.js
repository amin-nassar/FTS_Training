function keys(obj) {
  if (obj === null || obj === undefined)
    throw new TypeError(`Cannot convert ${obj} to object`);
  const keys = [];
  for (let key in obj) keys.push(key);
  return keys;
}

function values(obj) {
  if (obj === null || obj === undefined)
    throw new TypeError(`Cannot convert ${obj} to object`);
  const values = [];
  for (let key in obj) values.push(obj[key]);
  return values;
}

module.exports = { keys, values };
