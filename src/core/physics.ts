import Vector, {add, vector, scale, Vec} from './vector';
import {curry} from '../utils';

export const hasPhysics = (obj) =>
  !(
    !obj.mass ||
    !obj.position ||
    !obj.velocity ||
    !obj.acceleration ||
    !obj.oldpos
  );

const physics =
  ({
    mass = 1,
    position = Vector.zero,
    velocity = Vector.zero,
    acceleration = Vector.zero,
  } = {}) =>
    (p: any = {}) => ({
      ...p,
      mass,
      position,
      velocity,
      acceleration,
      oldpos: Vector.zero,
    });

const updatePhysics =
  (friction: number = 0.1) =>
    (obj) => {
      hasPhysics(obj);

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
  hasPhysics(obj);

  if (force.length !== 2) {
    throw new Error('the force needs to be a vector');
  }

  return {
    ...obj,
    acceleration: add(scale(force, obj.mass), obj.acceleration),
  };
};

const addForce = curry(_addForce);

export {physics, addForce, updatePhysics};
