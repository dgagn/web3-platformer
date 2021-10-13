import {vector, Vector} from 'core';
import {
  degreeToRad,
  radToDegree,
  scale,
  add,
  sub,
  dot,
  normalize,
  mag,
  dist,
} from '../../src/core/vector';

describe('vector', () => {
  it('should return a [number, number]', () => {
    expect(vector(1, 2)).toEqual([1, 2]);
  });
});

describe('should have alias for commonly used vector', () => {
  it('should have zero', () => {
    expect(Vector.zero).toEqual([0, 0]);
  });
  it('should have up', () => {
    expect(Vector.up).toEqual([0, 1]);
  });
  it('should have down', () => {
    expect(Vector.down).toEqual([0, -1]);
  });
  it('should have left', () => {
    expect(Vector.left).toEqual([-1, 0]);
  });
  it('should have right', () => {
    expect(Vector.right).toEqual([1, 0]);
  });
});

describe('degree and rad conversions', () => {
  it('should convert degrees to rad', () => {
    const convert = degreeToRad(180); // ?
    expect(convert).toBeCloseTo(3.14);
  });
  it('should convert rad to degrees', () => {
    const convert = radToDegree(3.14159); // ?
    expect(convert).toBeCloseTo(180);
  });
});

describe('vector functions', () => {
  it('should scale a vector by a scalar', () => {
    const v = scale([2, 2], 2); // ?
    expect(v).toEqual([4, 4]);
  });
  it('should add vectors together', () => {
    const v = add([0, 1], [1, 2], [3, 4]); // ?
    expect(v).toEqual([4, 7]);
  });
  it('should subtract vectors together', () => {
    const v = sub([3, 3], [1, 1], [1, 1]); // ?
    expect(v).toEqual([1, 1]);
  });
  it('should multiplie two vectors together to get the dot', () => {
    const v = dot([3, 4], [5, 5]); // ?
    expect(v).toEqual(35);
  });
  it('should normalize a vector', () => {
    const v = normalize([10, 10]); // ?
    expect(v[0]).toBeCloseTo(0.707);
    expect(v[1]).toBeCloseTo(0.707);
  });
  it('should normalize a vector with 0, 0 and return 0', () => {
    const v = normalize([0, 0]); // ?
    expect(v[0]).toEqual(0);
    expect(v[1]).toEqual(0);
  });
  it('should find the magnitude of a vector', () => {
    const v = mag([2, 3]); // ?
    expect(v).toBeCloseTo(3.61);
  });
  it('should find the distance between two vectors', () => {
    const v = dist([2, 3], [10, 6]); // ?
    expect(v).toBeCloseTo(8.54);
  });
});
