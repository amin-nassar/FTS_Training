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

function entries(obj) {
  if (obj === null || obj === undefined)
    throw new TypeError(`Cannot convert ${obj} to object`);
  const entries = [];
  for (let key in obj) entries.push([key, obj[key]]);
  return entries;
}

module.exports = { keys, values, entries };
