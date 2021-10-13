import {rectangle} from 'core/rectangle';
import {physics, sizer} from 'core';

describe('rectangle', () => {
  it('should be a function', () => {
    expect(rectangle).toBeInstanceOf(Function);
  });
  it('should throw if it is not a physics or sizer object', () => {
    const physicobj = physics({});
    const sizerobj = sizer([50, 50]);
    const correctObj = sizerobj(physicobj({})); // ?
    expect(() => rectangle({})).toThrow('physics');
    expect(() => rectangle(physicobj({}))).toThrow('size');
    expect(() => rectangle(correctObj)).not.toThrow();
  });
});
