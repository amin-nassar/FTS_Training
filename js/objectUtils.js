function keys(obj) {
  if (obj === null || obj === undefined)
    throw new TypeError(`Cannot convert ${obj} to object`);
  const keys = [];
  for (let key in obj) keys.push(key);
  return keys;
}

module.exports = { keys };
