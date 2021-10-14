import {pipe, pipeWith} from 'utils';

const inc = a => a + 1;
const dec = a => a - 1;

describe('pipe', () => {
  it('should return a function', () => {
    const add2 = pipe(inc, inc, inc, dec);
    expect(add2).toBeInstanceOf(Function);
  });
  it('should return the correct value when called', () => {
    const add3 = pipe(inc, inc, inc, inc, dec);
    expect(add3(3)).not.toBeInstanceOf(Function);
    expect(add3(3)).toBe(6);
  });
  it('should throw a error when called on a value', () => {
    const add = pipe(inc, dec, inc);
    expect(add(2)).toBe(3);
    expect(() => add(2)()).toThrow();
  });
});

describe('pipeWith', () => {
  it('should pipe with a default value', () => {
    const four = pipeWith(3, inc);
    expect(four).not.toBeInstanceOf(Function);
    expect(four).toBe(4);
  });
  it('should return a function with a default value piped', () => {
    const with4 = pipeWith(4);
    expect(with4).toBeInstanceOf(Function);
    expect(with4(inc)).toBe(5);
  });
});
