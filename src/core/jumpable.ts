import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';
import {emitterGame} from '../entities/emitter';

/**
 * Checks for jumpable properties.
 * @param {Object} obj - the entity
 * @return {boolean} - if the entity has jumpable
 * properties
 */
export function hasJumpable(obj) {
  return [obj.isGrounded, obj.jumpForce].every(isDefined);
}

/**
 * Adds the jumpable properties to a object.
 *
 * @param {number} jumpForce - the force of the jump
 * @return {EntityCB} - returns the entity
 * with the new jumpable properties
 */
export function jumpable(jumpForce) {
  return obj => ({
    ...obj,
    isGrounded: false,
    jumpForce,
  });
}

/**
 * Jumps a entity with the y axis passed in as a
 * parameter.
 *
 * @param {number} axisY - the y axis between -1 and 1
 * @return {EntityCB}
 */
export function jump(axisY) {
  return obj => {
    const objectValid = ![hasJumpable, hasPhysics].every(e => e(obj));

    if (objectValid) {
      throw new Error(
        'the object needs to have the jumpable and physics properties'
      );
    }

    obj.isGrounded && axisY && emitterGame.emit('jump', obj);

    return obj.isGrounded
      ? {
          ...addForce(vector(0, axisY * obj.jumpForce), obj),
          isGrounded: false,
        }
      : obj;
  };
}
