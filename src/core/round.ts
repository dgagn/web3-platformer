const round = (num: number, precision: number) =>
  Math.round((num + Number.EPSILON) * Math.pow(10, precision)) /
  Math.pow(10, precision);

export default round;
