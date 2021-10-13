import {addForce, hasPhysics, physics, updatePhysics} from '../../src/core';
import {pipeWith} from '../../src/utils';
import {gravity} from '../../src/core/physics';

describe('has physics', () => {
  it('should determine if it has physics properties on obj', () => {
    expect(hasPhysics({mass: 1})).toBeFalsy();
  });
  it('should determine correctly', () => {
    expect(hasPhysics(physics({})({}))).toBeTruthy();
  });
  it('should determine even with falsy values', () => {
    expect(
        hasPhysics(
            physics({
              mass: 0,
            })(),
        ),
    ).toBeTruthy();
  });
});

describe('physics', () => {
  it('should return a function', () => {
    const p = physics({});
    expect(p).toBeInstanceOf(Function);
  });
  it('should return a function', () => {
    const physicFn = physics({});
    expect(typeof physicFn).toBe('function');
  });
  it('should have all properties', () => {
    const physicsObj = physics({})({});
    expect(physicsObj).toHaveProperty('mass');
    expect(physicsObj).toHaveProperty('position');
    expect(physicsObj).toHaveProperty('velocity');
    expect(physicsObj).toHaveProperty('acceleration');
  });
  it('should have defaults', () => {
    const physicsObj = physics({})({});
    expect(physicsObj.mass).toBe(1);
    expect(physicsObj.position).toStrictEqual([0, 0]);
    expect(physicsObj.velocity).toStrictEqual([0, 0]);
    expect(physicsObj.acceleration).toStrictEqual([0, 0]);
  });
  it('should update property on call', () => {
    const physicsObj = physics({
      mass: 0,
      position: [50, 50],
      oldpos: [2, 0],
    })({});
    expect(physicsObj.mass).toBe(0);
    expect(physicsObj.position).toStrictEqual([50, 50]);
    expect(physicsObj.velocity).toStrictEqual([0, 0]);
    expect(physicsObj.acceleration).toStrictEqual([0, 0]);
    expect(physicsObj.oldpos).toStrictEqual([2, 0]);
  });
  it('should extend the last parameter and overwrite properties', () => {
    const defaultObj = {
      movementSpeed: true,
      isGrounded: true,
      mass: 100,
    };
    expect(physics({})(defaultObj)).toStrictEqual({
      ...defaultObj,
      mass: 1,
      position: [0, 0],
      velocity: [0, 0],
      acceleration: [0, 0],
      oldpos: [0, 0],
      movementSpeed: true,
      isGrounded: true,
    });
  });
});

describe('update physics', () => {
  it('should return a function', () => {
    const update = updatePhysics(0.1);
    expect(typeof update).toBe('function');
  });
  it('should throw a error if the object doesnt have the physics properties', () => {
    expect(() => updatePhysics(0.1)({})).toThrow('physics');
  });
  it('should not calculate if 0', () => {
    const physicObj = physics()({});
    expect(updatePhysics()(physicObj).position).toStrictEqual([0, 0]);
    expect(updatePhysics()(physicObj).velocity).toStrictEqual([0, 0]);
    expect(updatePhysics()(physicObj).acceleration).toStrictEqual([0, 0]);
    expect(updatePhysics()(physicObj).oldpos).toStrictEqual([0, 0]);
  });
  it('should update the old position', () => {
    const physicObj = physics({position: [50, 50]})({});
    expect(updatePhysics()(physicObj).position).toStrictEqual([50, 50]);
    expect(updatePhysics()(physicObj).oldpos).toStrictEqual([50, 50]);
  });
  it('should be able to add acceleration X', () => {
    const physicObj = physics({
      position: [50, 50],
      acceleration: [2, 0],
    })({});
    expect(updatePhysics()(physicObj).position).toStrictEqual([51.8, 50]);
    expect(updatePhysics()(physicObj).oldpos).toStrictEqual([50, 50]);
  });
  it('should be able to add acceleration Y', () => {
    const physicObj = physics({
      position: [50, 50],
      acceleration: [0, 2],
      velocity: [0, 0],
    })();
    expect(updatePhysics()(physicObj).position).toStrictEqual([50, 51.8]);
    expect(updatePhysics()(physicObj).oldpos).toStrictEqual([50, 50]);
  });
});

const correctObj = pipeWith({}, physics({}));
describe('add force', () => {
  it('should throw if invalid force is given', () => {
    expect(() => addForce(12, correctObj)).toThrow('vector');
  });
  it('should throw if object doesnt contain physics properties', () => {
    expect(() => addForce([10, 0], {})).toThrow('physics');
  });
  it('should be curried', () => {
    expect(addForce([10, 10])).toBeInstanceOf(Function);
    expect(addForce([10, 10], correctObj)).not.toBeInstanceOf(Function);
  });
  it('should add a force X', () => {
    const physicObj = physics({position: [50, 50]})({});
    const force = addForce([1, 0]);
    expect(force(physicObj).acceleration).toStrictEqual([1, 0]);
  });
  it('should add a force Y', () => {
    const physicObj = physics({position: [50, 50]})({});
    const force = addForce([0, 1]);
    expect(force(physicObj).acceleration).toStrictEqual([0, 1]);
  });

  it('should add a high force XY', () => {
    const physicObj = physics({position: [50, 50]})({});
    const force = addForce([20, 20]);
    expect(force(physicObj).acceleration).toStrictEqual([20, 20]);
  });
});

describe('gravity', () => {
  it('should throw a error if the object is not valid', () => {
    expect(() => gravity(1)({})).toThrow('physics');
  });
  it('should return a object with the applied force downward', () => {
    const physObj = physics()({});
    expect(gravity(1)(physObj)).toEqual({
      ...physObj,
      acceleration: [0, 1],
    });
  });
  it('should return a a object with the applied force upward', () => {
    const physObj = physics()({});
    expect(gravity(-1)(physObj)).toEqual({
      ...physObj,
      acceleration: [0, -1],
    });
  });
});
