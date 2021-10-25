export function round(num: number, precision: number = 2) {
  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, precision)) /
    Math.pow(10, precision)
  );
}
