import {isDefined} from '../utils';
import {addForce, hasPhysics} from './physics';
import {vector} from './vector';

export const hasJumpable = obj =>
  [obj.isGrounded, obj.jumpForce].every(isDefined);

export const jumpable = (jumpForce: number) => obj => ({
  ...obj,
  isGrounded: false,
  jumpForce,
});

export const jump = axisY => obj => {
  if (!hasJumpable(obj) || !hasPhysics(obj)) {
    throw new Error(
      'the object needs to have the jumpable and physics properties'
    );
  }

  return obj.isGrounded
    ? {
        ...addForce(vector(0, axisY * obj.jumpForce), obj),
        isGrounded: false,
      }
    : obj;
};
