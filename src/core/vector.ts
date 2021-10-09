type TVector = [number, number];

const vector = <X extends number, Y extends number>(x: X, y: Y): [X, Y] => [
  x,
  y,
];

const zero: TVector = vector(0, 0);
const up: TVector = vector(0, 1);
const down: TVector = vector(0, -1);
const left: TVector = vector(-1, 0);
const right: TVector = vector(1, 0);

const degreeToRad = (deg: number) => (deg * Math.PI) / 180;

const radToDegree = (rad: number) => (rad * 180) / Math.PI;

const scale = ([x, y]: TVector, scalar: number): TVector =>
  vector(scalar * x, scalar * y);

const add = (...vx: TVector[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax + vx, ay + vy), vector(0, 0));

const sub = (...vx: TVector[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax - vx, ay - vy));

const dot = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;

const normalize = (v: TVector) => scale(v, 1 / (mag(v) || 1));

const mag = ([x, y]) => Math.sqrt(x * x + y * y);

const dist = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const heading = (v: TVector) => {
  const angle = angleBetween(v, vector(0, -1 * mag(v)));
  const [vx] = v;
  return vx < 0 ? 360 - angle : angle;
};

const angleBetween = (v1: TVector, v2: TVector) =>
  radToDegree(Math.acos((dot(v1, v2) / mag(v1)) * mag(v2)));

export {
  vector,
  scale,
  add,
  sub,
  dot,
  normalize,
  mag,
  dist,
  heading,
  angleBetween,
  TVector,
};

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
  heading,
  angleBetween,
};
