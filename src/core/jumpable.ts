import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';
import {emitterGame} from '../entities/emitter';

export const hasJumpable = obj =>
  [obj.isGrounded, obj.jumpForce].every(isDefined);

export const jumpable = (jumpForce: number) => obj => ({
  ...obj,
  isGrounded: false,
  jumpForce,
});

export const jump = axisY => obj => {
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
