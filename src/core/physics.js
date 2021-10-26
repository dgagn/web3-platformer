import Vector, {add, scale, vector} from './vector';
import {curry, isDefined} from '../utils';

/**
 * Checks for physics properties.
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has physics
 * properties
 */
export function hasPhysics(obj) {
  return [
    obj.mass,
    obj.position,
    obj.velocity,
    obj.acceleration,
    obj.oldpos,
  ].every(isDefined);
}

/**
 * Adds physics to a entity.
 *
 * @param {number} mass - the mass of a object
 * @param {Vector} velocity - the velocity of a object
 * @param {Vector} acceleration - the acceleration of the object
 * @return {EntityCB} - the entity callback with
 * the physics properties applied
 */
export function physics({
  mass = 1,
  velocity = Vector.zero,
  acceleration = Vector.zero,
} = {}) {
  return (obj = {}) => ({
    ...obj,
    mass,
    velocity,
    acceleration,
  });
}

/**
 * Updates a position on a entity.
 *
 * @param {Vector} position - the current position
 * @param {Vector} oldpos - last frame position
 * @return {EntityCB} - a entity callback with the updated
 * position
 */
export function position(position = Vector.zero, oldpos = Vector.zero) {
  return obj => ({
    ...obj,
    position,
    oldpos,
  });
}

/**
 * Updates the physics properties.
 *
 * @param {number} friction
 * @return {EntityCB} - a entity callback with the updated
 * physics properties
 */
export function updatePhysics(friction = 0.1) {
  return obj => {
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
      (vy + ay) * (1 - friction)
    );
    return {
      ...obj,
      position: vector(px + uvx, py + uvy),
      velocity: vector(uvx, uvy),
      acceleration: Vector.zero,
      oldpos,
    };
  };
}

/**
 * Adds a force to a object.
 *
 * @internal
 * @function
 * @param {Vector} force - the force to apply
 * @param {Object} obj - the entity
 * @return {Object} - the entity object
 */
const _addForce = (force, obj) => {
  if (!hasPhysics(obj) || force.length !== 2) {
    throw new Error(
      'the object needs to have the physics properties ' +
        'and force needs to be a vector'
    );
  }

  return {
    ...obj,
    acceleration: add(scale(force, obj.mass), obj.acceleration),
  };
};

/**
 * Adds a acceleration force to move the object
 * with physics.
 *
 * @function
 * @category core
 * @param {number[]} force - a force vector [x, y]
 * @param {Object} obj - a object to apply the force
 * @return {EntityCB} - returns a `curried` version of the
 * `_addForce` that returns a object with a new acceleration
 * @see _addForce
 */
export const addForce = curry(_addForce);

/**
 * Applies a gravity on a entity.
 *
 * @param {number} gravity - a number, negative or positive
 * @return {EntityCB} - the entity callback with the
 * updated physics properties (gravity).
 */
export function gravity(gravity) {
  return obj => {
    if (!hasPhysics(obj)) {
      throw new Error('the object must have the physics properties');
    }
    return addForce(vector(0, gravity), obj);
  };
}
