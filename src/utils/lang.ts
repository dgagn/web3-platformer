export const isDefined = value => typeof value !== 'undefined';

export function createArray(elems) {
  return Array(elems).fill(true);
}
