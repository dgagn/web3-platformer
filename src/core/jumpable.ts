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

const js = new Audio('jump.wav');
js.volume = 0.8;

export const jump = axisY => obj => {
  const objectValid = ![hasJumpable, hasPhysics].every(e => e(obj));

  if (objectValid) {
    throw new Error(
      'the object needs to have the jumpable and physics properties'
    );
  }

  if (obj.isGrounded && axisY) {
    js.play();
  }

  return obj.isGrounded
    ? {
        ...addForce(vector(0, axisY * obj.jumpForce), obj),
        isGrounded: false,
      }
    : obj;
};
