import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';
import {emitterGame} from '../entities/emitter';

export function hasJumpable(obj) {
  return [obj.isGrounded, obj.jumpForce].every(isDefined);
}

export function jumpable(jumpForce: number) {
  return obj => ({
    ...obj,
    isGrounded: false,
    jumpForce,
  });
}

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
