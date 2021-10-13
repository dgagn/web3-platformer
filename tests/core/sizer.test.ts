import {sizer} from 'core';

describe('sizer', () => {
  it('should add a property size on a default obj', () => {
    const size = sizer([10, 10])({}); // ?
    expect(size).toEqual({size: [10, 10]});
  });
  it('should default to [0, 0]', () => {
    const size = sizer()({}); // ?
    expect(size).toEqual({size: [0, 0]});
  });
  it('should update the y size property', () => {
    const size = sizer([null, 64])({
      size: [100, 0],
    }); // ?
    expect(size).toEqual({
      size: [100, 64],
    });
  });
  it('should update the x size property', () => {
    const size = sizer([12, null])({
      size: [100, 100],
    }); // ?
    expect(size).toEqual({
      size: [12, 100],
    });
  });
  it('should throw if null and not a size object', () => {
    expect(() => sizer([0, null])({})).toThrow('size');
  });
});
