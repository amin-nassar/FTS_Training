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

function pick(obj, keys) {
  if (arguments.length <= 1 || obj === null) return {};
  const outputObj = {};
  if (!Array.isArray(keys)) outputObj[keys] = obj[keys];
  else {
    const stringKeys = keys.map(String);
    for (let key in obj)
      if (stringKeys.includes(key)) outputObj[key] = obj[key];
  }
  return outputObj;
}

function omit(obj, keys) {
  if (arguments.length === 0 || obj === null) return {};
  if (arguments.length === 1) return obj;
  const outputObj = {};
  if (!Array.isArray(keys)) {
    for (let key in obj) {
      if (key !== String(keys)) outputObj[key] = obj[key];
    }
  } else {
    const stringKeys = keys.map(String);
    for (let key in obj)
      if (!stringKeys.includes(key)) outputObj[key] = obj[key];
  }
  return outputObj;
}

function getPropValue(object, props) {
  if (object === null) return;
  const firstProp = props[0];
  if (props.length === 1) return object[firstProp];
  const innerObject = object[firstProp];
  if (innerObject === undefined) return;
  return getPropValue(innerObject, props.slice(1));
}

function mayBe(obj, key, defaultValue) {
  if (arguments.length <= 1) return;
  const keys = String(key).split(".");
  const finalValue = getPropValue(obj, keys);
  return finalValue === undefined ? defaultValue : finalValue;
}

module.exports = { keys, values, entries, pick, omit, mayBe };
