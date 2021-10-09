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

const draw =
  (context: CanvasRenderingContext2D) =>
    ([v1x, v1y]) =>
      ([v2x, v2y], n, color) => {
        context.beginPath();
        context.moveTo(v2x, v2y);
        const [vx, vy] = vector(v2x + v1x * n, v2y + v1y * n);
        context.lineTo(vx, vy);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
      };

const round = (num: number, precision: number) =>
  Math.round((num + Number.EPSILON) * Math.pow(10, precision)) /
  Math.pow(10, precision);

const text =
  (context: CanvasRenderingContext2D) =>
    ([v1x, v1y]) =>
      ([v2x, v2y], prefix: string) => {
        context.fillText(
            prefix + `: [${round(v1x, 2)}, ${round(v1y, 2)}]`,
            v2x,
            v2y,
        );
      };

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
  draw,
  text,
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
  draw,
  text,
};
