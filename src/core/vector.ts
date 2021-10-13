import {curry, round} from '../utils';

export type Vec = [number, number];

export const vector = (x: number, y: number): Vec => [x, y];

const zero: Vec = vector(0, 0);
const up: Vec = vector(0, 1);
const down: Vec = vector(0, -1);
const left: Vec = vector(-1, 0);
const right: Vec = vector(1, 0);

export const scale = ([x, y]: Vec, scalar: number): Vec =>
  vector(scalar * x, scalar * y);

export const add = (...vx: Vec[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax + vx, ay + vy), vector(0, 0));

export const sub = (...vx: Vec[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax - vx, ay - vy));

export const mult = (...vx: Vec[]) =>
  vx.reduce(([ax, ay], [vx, vy]) => vector(ax * vx, ay * vy), vector(1, 1));

export const dot = ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2;

export const normalize = (v: Vec) => scale(v, 1 / (mag(v) || 1));

export const mag = ([x, y]) => Math.sqrt(x * x + y * y);

export const dist = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

// ignore coverage
const _drawVector = (
    context: CanvasRenderingContext2D,
    [v1x, v1y],
    [v2x, v2y],
    n,
    color,
) => {
  context.beginPath();
  context.moveTo(v2x, v2y);
  const [vx, vy] = vector(v2x + v1x * n, v2y + v1y * n);
  context.lineTo(vx, vy);
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
};

// ignore coverage
const _textVector = (
    context: CanvasRenderingContext2D,
    [v1x, v1y],
    [v2x, v2y],
    prefix: string,
) => {
  context.fillText(prefix + `: [${round(v1x, 2)}, ${round(v1y, 2)}]`, v2x, v2y);
};

export const draw = curry(_drawVector);
export const text = curry(_textVector);

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
  draw,
  text,
};
