import {hasMovable, movable, movement, physics, size} from 'core';
import {pipeWith} from 'utils';

describe('movable', () => {
  it('should say if a object is movable', () => {
    expect(hasMovable({})).toBeFalsy();
    expect(hasMovable({speed: 1})).toBeTruthy();
  });
  it('should add a speed property to a object', () => {
    expect(movable(10)({})).toEqual({
      speed: 10,
    });
    expect(movable(0)({hello: true})).toEqual({
      hello: true,
      speed: 0,
    });
  });
  it('should have a default of 1', () => {
    expect(movable()({})).toEqual({
      speed: 1,
    });
  });
  it('should throw if not a movable object', () => {
    const obj = pipeWith({}, physics(), size(10, 10)); // ?
    expect(() => movement(-1)(obj)).toThrow('movable');
  });
  it('should resolve depending on different axis', () => {
    const obj = pipeWith({}, physics(), size(10, 10), movable(1)); // ?
    expect(movement(-1)(obj)).toEqual({
      ...obj,
      acceleration: [-1, 0],
    });
    expect(movement(1)(obj)).toEqual({
      ...obj,
      acceleration: [1, 0],
    });
    expect(movement(0)(obj)).toEqual({
      ...obj,
      acceleration: [0, 0],
    });
  });
  it('should resolve depending on the speed', () => {
    const objSpeeder = pipeWith({}, physics(), size(10, 10), movable(10)); // ?
    expect(movement(1)(objSpeeder)).toEqual({
      ...objSpeeder,
      acceleration: [10, 0],
    });
  });
  it('should throw if the obj doesnt contain physics', () => {
    expect(() => movement(1)({speed: 1})).toThrow('physics');
  });
});
