import engine from '../../src/core/engine';

describe('engine', () => {
  it('should be a function', () => {
    expect(engine).toBeInstanceOf(Function);
  });
  it('should return a function', () => {
    expect(engine(() => {})).toBeInstanceOf(Function);
  });
});
