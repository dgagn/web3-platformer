import {size} from 'core';

describe('size', () => {
  it('should add a property size on a default obj', () => {
    const sizer = size(10, 10)({}); // ?
    expect(sizer).toEqual({
      width: 10,
      height: 10,
    });
  });
  it('should add a property and keep all others', () => {
    const sizer = size(
        100,
        50,
    )({
      hello: true,
    }); // ?
    expect(sizer).toEqual({
      hello: true,
      width: 100,
      height: 50,
    });
  });
});
