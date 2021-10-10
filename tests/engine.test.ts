import engine from '../src/core/engine';

describe('engine', () => {
  it('should return a callback', () => {
    const fn = engine(() => {});
    expect(typeof fn).toBe('function');
  });
});
