import size from '../src/core/size';

describe('size', () => {
  it('should return a new function', () => {
    const sizer = size(32, 32);
    expect(typeof sizer).toBe('function');
  });
  it('should create new properties on the object', () => {
    const sizer = size(32, 64);
    expect(sizer({}).width).toBe(32);
    expect(sizer({}).height).toBe(64);
  });
  it('should create properties and return old object', () => {
    const sizer = size(32, 64);
    const defaultObj = {
      speed: 10,
    };
    expect(sizer(defaultObj).speed).toBe(10);
    expect(sizer(defaultObj).width).toBe(32);
    expect(sizer(defaultObj).height).toBe(64);
  });
});
