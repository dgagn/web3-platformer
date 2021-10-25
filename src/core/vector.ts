export const vector = (x, y) => [x, y];

const zero = vector(0, 0);
const up = vector(0, 1);
const down = vector(0, -1);
const left = vector(-1, 0);
const right = vector(1, 0);

export const scale = ([x, y], scalar) => vector(scalar * x, scalar * y);

export const add = (...vx) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax + vx, ay + vy), vector(0, 0));

export const sub = (...vx) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax - vx, ay - vy));

export const mult = (...vx) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax * vx, ay * vy), vector(1, 1));

export const dot = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;

export const normalize = v => scale(v, 1 / (mag(v) || 1));

export const mag = ([x, y]) => Math.sqrt(x * x + y * y);

export const dist = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export default {
  vector,
  zero,
  left,
  right,
  up,
  down,
  scale,
  add,
  sub,
  dot,
  normalize,
  mag,
  dist,
};
