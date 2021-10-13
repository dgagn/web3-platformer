import Vec, {add, vector, scale, Vector} from './vector';
import {curry} from '../utils';

const isPhysics = (obj) => {
  if (obj.mass && obj.position && obj.velocity && obj.acceleration) {
    throw new Error('the object needs to have physics properties');
  }
};

const physics =
  ({
    mass = 1,
    position = Vec.zero,
    velocity = Vec.zero,
    acceleration = Vec.zero,
  } = {}) =>
    (p: any = {}) => ({
      ...p,
      mass,
      position,
      velocity,
      acceleration,
    });

const updatePhysics =
  (friction: number = 0.1) =>
    (obj) => {
      isPhysics(obj);

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
        acceleration: Vec.zero,
        oldpos,
      };
    };

const _addForce = (force: Vector, obj) => {
  isPhysics(obj);

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
