import compose from '../src/core/compose';

describe('compose', () => {
  it('should return a function', () => {
    const piper = compose(() => {});
    expect(typeof piper).toBe('function');
  });
  it('should pass the second argument to the first function', () => {
    const fn1 = (param) => {
      expect(param).toBe('hello');
      return param;
    };
    const piper = compose(fn1)('hello');
    expect(piper).toBe('hello');
  });
  it('should pass to the chain', () => {
    const fn1 = (param) => {
      expect(param).toBe('hello');
      return param;
    };
    const piper = compose(fn1, fn1, fn1, fn1)('hello');
    expect(piper).toBe('hello');
  });
  it('should pass to the chain', () => {
    const fn1 = (p) => p + '1';
    const piper = compose(fn1, fn1, fn1, fn1)('hello');
    expect(piper).toBe('hello1111');
  });
});
