import Vec, {add, scale, Vector} from '../../src/core/vector';
import {curry} from '../../src/utils';

const _physics = (
    {
      mass = 1,
      position = Vec.zero,
      velocity = Vec.zero,
      acceleration = Vec.zero,
    } = {},
    obj,
) => ({
  ...obj,
  mass,
  position,
  velocity,
  acceleration,
});

const _addForce = (force: Vector, obj) => ({
  ...obj,
  acceleration: add(scale(force, obj.mass), obj.acceleration),
});

export const createPhysics = curry(_physics);

describe('physics', () => {
  it('should add defaults to a obj with the physics properties', () => {
    expect(createPhysics({}, {})).toEqual({
      mass: 1,
      position: [0, 0],
      velocity: [0, 0],
      acceleration: [0, 0],
    });
  });
  it('should add the a existing object the physics properties', () => {
    expect(createPhysics({}, {exist: false})).toEqual({
      exist: false,
      mass: 1,
      position: [0, 0],
      velocity: [0, 0],
      acceleration: [0, 0],
    });
  });
  it('should create the object with different defaults', () => {
    expect(createPhysics({position: [50, 50], mass: 2}, {})).toEqual({
      mass: 2,
      position: [50, 50],
      velocity: [0, 0],
      acceleration: [0, 0],
    });
  });
  it('should be curried and return a function if the second arg is not provided', () => {
    expect(createPhysics({})).toBeInstanceOf(Function);
  });
});
