declare module 'stats' {
  type comparatorFunc = (a: number, b: number) => number;
  type indexFunc = (input: number[], comparator: comparatorFunc) => number;
  type elementFunc = (input: number[], comparator: comparatorFunc) => number | null;

  // Min
  export const getMaxIndex: indexFunc;
  export const getMaxElement: elementFunc;
  // Max
  export const getMinIndex: indexFunc;
  export const getMinElement: elementFunc;
  // Median
  export const getMedianIndex: indexFunc;
  export const getMedianElement: elementFunc;
  // Average
  export function getAverageValue(input: number[], getValue: (item: number) => number): number | null;

}
