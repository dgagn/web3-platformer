import Vector, {add, vector, scale, Vec} from './vector';
import {curry, isDefined} from '../utils';

export const hasPhysics = (obj) =>
  [obj.mass, obj.position, obj.velocity, obj.acceleration, obj.oldpos].every(
      isDefined,
  );

const physics =
  ({
    mass = 1,
    position = Vector.zero,
    velocity = Vector.zero,
    acceleration = Vector.zero,
    oldpos = Vector.zero,
  } = {}) =>
    (obj = {}) => ({
      ...obj,
      mass,
      position,
      velocity,
      acceleration,
      oldpos,
    });

const updatePhysics =
  (friction: number = 0.1) =>
    (obj) => {
      if (!hasPhysics(obj)) {
        throw new Error('object must have physics properties');
      }

      const [[px, py], [vx, vy], [ax, ay]] = [
        obj.position,
        obj.velocity,
        obj.acceleration,
      ];
      const oldpos = vector(px, py);
      const [uvx, uvy] = vector(
          (vx + ax) * (1 - friction),
          (vy + ay) * (1 - friction),
      );
      return {
        ...obj,
        position: vector(px + uvx, py + uvy),
        velocity: vector(uvx, uvy),
        acceleration: Vector.zero,
        oldpos,
      };
    };

const _addForce = (force: Vec, obj) => {
  if (!hasPhysics(obj) || force.length !== 2) {
    throw new Error(
        'the object needs to have the physics properties and force needs to be a vector',
    );
  }

  return {
    ...obj,
    acceleration: add(scale(force, obj.mass), obj.acceleration),
  };
};

const addForce = curry(_addForce);

export const gravity = (gravity: number) => (obj) => {
  if (!hasPhysics(obj)) {
    throw new Error('the object must have the physics properties');
  }
  return addForce(vector(0, gravity), obj);
};

export {physics, addForce, updatePhysics};
