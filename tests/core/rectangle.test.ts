import {physics, size, rectangle} from 'core';
import {pipeWith} from '../../src/utils';
import {hasRectangle} from '../../src/core/rectangle';

const correctObj = pipeWith({}, physics({}), size(50, 50));
describe('rectangle', () => {
  it('should be a function', () => {
    expect(rectangle).toBeInstanceOf(Function);
  });
  it('should have a rectangle properties checker', () => {
    expect(hasRectangle({})).toBeFalsy();
    expect(hasRectangle({})).toBeFalsy();
    expect(hasRectangle(rectangle(correctObj))).toBeTruthy();
  });
  it('should throw if it is not a physics or sizer object', () => {
    const physicobj = physics({});
    expect(() => rectangle({})).toThrow('physics');
    expect(() => rectangle(physicobj({}))).toThrow('size');
    expect(() => rectangle(correctObj)).not.toThrow();
  });
  it('should add rectangle properties', () => {
    const correctObj = pipeWith({}, physics({}), size(50, 50), rectangle);
    expect(correctObj).toHaveProperty('top');
    expect(correctObj).toHaveProperty('bottom');
    expect(correctObj).toHaveProperty('left');
    expect(correctObj).toHaveProperty('right');
    expect(correctObj).toHaveProperty('oldtop');
    expect(correctObj).toHaveProperty('oldbottom');
    expect(correctObj).toHaveProperty('oldleft');
    expect(correctObj).toHaveProperty('oldright');
  });
  it('should have correct rectangle properties', () => {
    expect(rectangle(correctObj)).toEqual({
      ...correctObj,
      top: 0,
      bottom: 50,
      left: 0,
      right: 50,
      oldtop: 0,
      oldbottom: 50,
      oldleft: 0,
      oldright: 50,
    });
  });
  it('should update rectangle on new position', () => {
    const newCorrect = pipeWith(
        {},
        physics({position: [20, 30]}),
        size(10, 20),
    );
    expect(rectangle(newCorrect)).toEqual({
      ...newCorrect,
      top: 30,
      bottom: 50,
      left: 20,
      right: 30,
      oldtop: 0,
      oldbottom: 20,
      oldleft: 0,
      oldright: 10,
    });
  });
});
