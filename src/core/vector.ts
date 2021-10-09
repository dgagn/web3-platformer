export type Vector = [number, number];

const vector = (x: number, y: number): Vector => [x, y];

export const vec = {
  zero: vector(0, 0),
  up: vector(0, 1),
  down: vector(0, -1),
  left: vector(-1, 0),
  right: vector(1, 0),
};

export const degreeToRad = (deg: number) => (deg * Math.PI) / 180;

export const radToDegree = (rad: number) => (rad * 180) / Math.PI;

export const scale = ([x, y]: Vector, scalar: number): Vector =>
  vector(scalar * x, scalar * y);

export const add = (...vx: Vector[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax + vx, ay + vy), vector(0, 0));

export const sub = (...vx: Vector[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax - vx, ay - vy));

export const dot = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;

export const normalize = (v: Vector) => scale(v, 1 / (mag(v) || 1));

export const mag = ([x, y]) => Math.sqrt(x * x + y * y);

export const dist = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const heading = (v: Vector) => {
  const angle = angleBetween(v, vector(0, -1 * mag(v)));
  const [vx] = v;
  return vx < 0 ? 360 - angle : angle;
};

export const angleBetween = (v1: Vector, v2: Vector) =>
  radToDegree(Math.acos((dot(v1, v2) / mag(v1)) * mag(v2)));

export default vector;
