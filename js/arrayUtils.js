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

module.exports = { map };
