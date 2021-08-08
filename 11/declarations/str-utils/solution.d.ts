declare module 'str-utils' {
  type stringInOut = (input: string) => string;
  export const strReverse: stringInOut;
  export const strToLower: stringInOut;
  export const strToUpper: stringInOut;
  export const strRandomize: stringInOut;
  export const strInvertCase: stringInOut;
}
