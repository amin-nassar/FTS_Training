/**
 * 2 arguments passed: returns a new array
 * which is a result of input being mapped using
 * the specified mapper.
 *
 * 1 argument passed: returns a function which accepts
 * an input and returns a new array which is a result
 * of input being mapped using original mapper.
 *
 * 0 arguments passed: returns itself.
 *
 * @param {Function} mapper
 * @param {Array} input
 * @return {Array | Function}
 */
///////////////////////////////////////////////////////////////////////////////////////
interface mapperFunc<In, Out> {
  (): mapperFunc<In, Out>;
  (subInput: In[]): Out[];
}

interface mapFunc {
  (): mapFunc;
  <In, Out>(mapper: (input: In) => Out): mapperFunc<In, Out>;
  <In, Out>(mapper: (input: In) => Out, input: In[]): Out[];
}
///////////////////////////////////////////////////////////////////////////////////////


export const map = function <In, Out>(mapper: (input: In) => Out, input: In[]) {
  if (arguments.length === 0) { return map }
  if (arguments.length === 1) {
    return function subFunction(subInput: In[]) {
      return arguments.length ? subInput.map(mapper) : subFunction;
    } as mapperFunc<In, Out>;
  }
  return input.map(mapper);
} as mapFunc;

/**
* 2 arguments passed: returns a new array
* which is a result of input being filtered using
* the specified filter function.
*
* 1 argument passed: returns a function which accepts
* an input and returns a new array which is a result
* of input being filtered using original filter
* function.
*
* 0 arguments passed: returns itself.
*
* @param {Function} filterer
* @param {Array} input
* @return {Array | Function}
*/

///////////////////////////////////////////////////////////////////////////////////////
interface filtererFunc<T> {
  (): filtererFunc<T>;
  (input: T[]): T[];
}

interface filterFunc {
  (): filterFunc;
  <T>(filterer: (input: T) => boolean): filtererFunc<T>;
  <T>(filterer: (input: T) => boolean, input: T[]): T[];
}
///////////////////////////////////////////////////////////////////////////////////////

export const filter = function <T>(filterer: (input: T) => boolean, input: T[]) {
  if (arguments.length === 0) { return filter }
  if (arguments.length === 1) {
    return function subFunction(subInput: T[]) {
      return arguments.length ? subInput.filter(filterer) : subFunction;
    } as filtererFunc<T>;
  }
  return input.filter(filterer);
} as filterFunc;

/**
* 3 arguments passed: reduces input array it using the
* specified reducer and initial value and returns
* the result.
*
* 2 arguments passed: returns a function which accepts
* input array and reduces it using previously specified
* reducer and initial value and returns the result.
*
* 1 argument passed: returns a function which:
*   * when 2 arguments is passed to the subfunction, it
*     reduces the input array using specified initial
*     value and previously specified reducer and returns
*     the result.
*   * when 1 argument is passed to the subfunction, it
*     returns a function which expects the input array
*     and reduces the specified input array using
*     previously specified reducer and inital value.
*   * when 0 argument is passed to the subfunction, it
*     returns itself.
*
* 0 arguments passed: returns itself.
*
* @param {Function} reducer
* @param {*} initialValue
* @param {Array} input
* @return {* | Function}
*/

///////////////////////////////////////////////////////////////////////////////////////
interface reduceSubFunctionOnePar<T> {
  (): reduceSubFunctionOnePar<T>;
  (subInput: T[]): any;
}

interface reduceSubFunctionTwoPars<T> {
  (): reduceSubFunctionTwoPars<T>;
  (subInitialValue: any): reduceSubFunctionOnePar<T>;
  (subInitialValue: any, subInput: T[]): any;
}

interface reduceFunc {
  (): reduceFunc;
  <T>(reducer: reducerFunc): reduceSubFunctionTwoPars<T>;
  <T>(reducer: reducerFunc, initialValue: any): reduceSubFunctionTwoPars<T>;
  <T>(reducer: reducerFunc, initialValue: any, input: T[]): any;
}
///////////////////////////////////////////////////////////////////////////////////////

type reducerFunc = <T>(acc: any, element: T) => any;
export const reduce = function<T>(reducer:reducerFunc , initialValue: any, input: T[]) {
  if (arguments.length === 0) { return reduce }
  if (arguments.length === 1) {
    return function subFunction(subInitialValue: any, subInput: T[]): any | reduceSubFunctionTwoPars<T> {
      if (arguments.length === 0) { return subFunction }
      if (arguments.length === 1) {
        return function subSubFunction(subSubInput: T[]): any | reduceSubFunctionOnePar<T> {
          if (arguments.length === 0) { return subSubFunction }
          return subSubInput.reduce(reducer, subInitialValue);
        } as reduceSubFunctionOnePar<T>;
      }
      return subInput.reduce(reducer, subInitialValue);
    } as reduceSubFunctionTwoPars<T>;
  }
  if (arguments.length === 2) {
    return function subFunction(subInput: T[]) : any | reduceSubFunctionOnePar<T> {
      if (arguments.length === 0) { return subFunction }
      return subInput.reduce(reducer, initialValue);
    } as reduceSubFunctionOnePar<T>;
    }
  return input.reduce(reducer, initialValue);
} as reduceFunc;

/**
* 2 arguments passed: returns sum of a and b.
*
* 1 argument passed: returns a function which expects
* b and returns sum of a and b.
*
* 0 arguments passed: returns itself.
*
* @param {Number} a
* @param {Number} b
* @return {Number | Function}
*/
///////////////////////////////////////////////////////////////////////////////////////
interface subFunc {
  (): subFunc;
  (a: number): number
}

interface arthFunc {
  (): arthFunc;
  (a: number): subFunc
  (a: number, b: number): number;
}
///////////////////////////////////////////////////////////////////////////////////////

export const add = function (a: number, b: number) {
  if (arguments.length === 0) { return add }
  if (arguments.length === 1) {
    return function subFunction(subB: number) {
      return arguments.length ? a + subB : subFunction
    };
  }
  return a + b;
} as arthFunc;

/**
* 2 arguments passed: subtracts b from a and
* returns the result.
*
* 1 argument passed: returns a function which expects
* b and subtracts b from a and returns the result.
*
* 0 arguments passed: returns itself.
*
* @param {Number} a
* @param {Number} b
* @return {Number | Function}
*/
export const subtract = function (a: number, b: number) {
  if (arguments.length === 0) { return subtract }
  if (arguments.length === 1) {
    return function subFunction(subB) {
      return arguments.length ? a - subB : subFunction
    } as subFunc;
  }
  return a - b;
} as arthFunc;

/**
* 2 arguments passed: returns value of property
* propName of the specified object.
*
* 1 argument passed: returns a function which expects
* propName and returns value of property propName
* of the specified object.
*
* 0 arguments passed: returns itself.
*
* @param {Object} obj
* @param {String} propName
* @return {* | Function}
*/
///////////////////////////////////////////////////////////////////////////////////////
interface propSubFunc {
  (): propSubFunc;
  (subPropName: string): any;
}

interface propFunc {
  (): propFunc;
  (obj: Object): propSubFunc;
  (obj: Object, propName: string): any;
}
///////////////////////////////////////////////////////////////////////////////////////

export const prop = function (obj: Object, propName: string): any | Function {
  if (arguments.length === 0) { return prop }
  if (arguments.length === 1) {
    return function subFunction(subPropName: string) {
      return arguments.length ? obj[subPropName] : subFunction
    } as propSubFunc;
  }
  return obj[propName];
} as propFunc;

/**
* >0 arguments passed: expects each argument to be
* a function. Returns a function which accepts the
* same arguments as the first function. Passes these
* arguments to the first function, the result of
* the first function passes to the second function,
* the result of the second function to the third
* function... and so on. Returns the result of the
* last function execution.
*
* 0 arguments passed: returns itself.
*
* TODO TypeScript
*   * Should properly handle at least 5 arguments.
*   * Should also make sure argument of the next
*     function matches the return type of the previous
*     function.
*
* @param {Function[]} functions
* @return {*}
*/

///////////////////////////////////////////////////////////////////////////////////////
interface pipeSubFunction {
  (): any;
}

interface pipeFunc {
  (): pipeFunc;
  (...funcs: Function[]): pipeSubFunction;
}
///////////////////////////////////////////////////////////////////////////////////////

export const pipe = function (...functions: Function[]): pipeFunc | pipeSubFunction {
  if (arguments.length === 0) { return pipe }
  return function subFunction(): any {
    let nextArguments = Array.from(arguments);
    let result;
    for (const func of functions) {
      result = func(...nextArguments);
      nextArguments = [result];
    }
    return result;
  } as pipeSubFunction;
} as pipeFunc;
