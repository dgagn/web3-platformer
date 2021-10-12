import {curry, curryN} from 'utils';

const sum = (a = 0, b = 0, c = 0) => a + b + c;

describe('curry', () => {
  it('should curry the function with a length of 3', () => {
    expect(curry(sum)(1, 2, 3)).toBe(6);
    expect(curry(sum)(1)(2, 3)).toBe(6);
    expect(curry(sum)(1)(2)(3)).toBe(6);
    expect(curry(sum)(1, 2)(3)).toBe(6);
  });
  it('should return a new function when arguments have not been provided', () => {
    expect(curry(sum)(1, 2)).toBeInstanceOf(Function);
  });
  it('should ignore empty arguments call', () => {
    expect(curry(sum)()).toBeInstanceOf(Function);
    expect(curry(sum)()()(1)()(2, 3)).toBe(6);
  });
  it('should throw a error when calling a function on a value', () => {
    expect(() => curry(sum)(1, 2, 3)()).toThrow();
  });
  it('should curry n times a function', () => {
    expect(curryN(1, sum)(3, 3, 3)).toBe(9);
    expect(curryN(2, sum)(3)(3, 3)).toBe(9);
    expect(curryN(3, sum)(3)(3)(3)).toBe(9);
    expect(curryN(3, sum)(3, 3, 3)).toBe(9);
    expect(() => curryN(1, sum)(3)(3, 3)).toThrow();
    expect(() => curryN(2, sum)(3)(3)(3)).toThrow();
  });
});
