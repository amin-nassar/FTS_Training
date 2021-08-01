function map(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (!(callback instanceof Function))
    throw new TypeError(`${callback} Is Not A Function`);
  const outputArray = [];
  const boundCallBack = callback.bind(thisArg);
  for (let index = 0; index < array.length; index++) {
    const currElement = array[index];
    const mappedElement = boundCallBack(currElement, index, array);
    outputArray.push(mappedElement);
  }
  return outputArray;
}

function filter(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (!(callback instanceof Function))
    throw new TypeError(`${callback} Is Not A Function`);
  const outputArray = [];
  const boundCallBack = callback.bind(thisArg);
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (boundCallBack(item, index, array)) outputArray.push(item);
  }
  return outputArray;
}

function some(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (!(callback instanceof Function))
    throw new TypeError(`${callback} Is Not A Function`);
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (callback.call(thisArg, item, index, array)) return true;
  }
  return false;
}

function every(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (!(callback instanceof Function))
    throw new TypeError(`${callback} Is Not A Function`);
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (!callback.call(thisArg, item, index, array)) return false;
  }
  return true;
}

function find(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (!(callback instanceof Function))
    throw new TypeError(`${callback} Is Not A Function`);
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (callback.call(thisArg, item, index, array)) return item;
  }
  return;
}

function findIndex(array, callback, thisArg) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (!(callback instanceof Function))
    throw new TypeError(`${callback} Is Not A Function`);
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (callback.call(thisArg, item, index, array)) return index;
  }
  return;
}

function joinToArray(array, value) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  const outputArray = [array[0]];
  for (let i = 1; i < array.length; i++) {
    outputArray.push(value, array[i]);
  }
  return outputArray;
}

function reverse(array) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  const outputArray = [];
  for (let i = array.length - 1; i >= 0; i--) outputArray.push(array[i]);
  return outputArray;
}

function last(array) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  const index = array.length - 1;
  return array[index];
}

function flatten(array) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  const outputArray = [...array];
  for (let i = 0; i < outputArray.length; i++) {
    const element = outputArray[i];
    if (Array.isArray(element)) outputArray.splice(i, 1, ...element);
  }
  return outputArray;
}

function groupBy(array, iteratee) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  let obj = {};
  if (iteratee) {
    for (item of array) {
      const propValue =
        iteratee instanceof Function ? iteratee(item) : item[iteratee];
      obj[propValue] = obj[propValue] ? [...obj[propValue], item] : [item];
    }
  } else for (item of array) obj[item] = item;

  return obj;
}

function removeDuplicates(array, key) {
  if (!Array.isArray(array)) throw new TypeError(`${array} Is Not An Array`);
  if (key === undefined) return [...new Set(array)];

  const getPropertyValue = function (item, keys) {
    if (keys.length === 1) return item[keys[0]];
    myItem = item[keys[0]];
    return getPropertyValue(myItem, keys.slice(1));
  };
  const createNewObject = function (prop, keys) {
    if (keys.length === 1) return { [keys[0]]: prop };
    return { [keys[0]]: createNewObject(prop, keys.slice(1)) };
  };

  const map = new Map();
  const arr = [];
  const keys = key.split(".");
  for (item of array) {
    const propertyValue = getPropertyValue(item, keys);
    map.set(propertyValue, 0);
  }
  for (let property of map.keys()) arr.push(createNewObject(property, keys));
  return arr;
}

module.exports = {
  map,
  filter,
  some,
  every,
  find,
  findIndex,
  joinToArray,
  reverse,
  last,
  flatten,
  groupBy,
  removeDuplicates
};
