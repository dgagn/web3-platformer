import {state} from '../core/state';

export const stateIdle = state('idle', true);

export const stateRunning = (speed: number) => obj => {
  const [vx] = obj.velocity;
  const isRunning = vx < -speed || (vx > speed && obj.isGrounded);
  return state('running', isRunning, obj);
};

export const stateFalling = (fallingForce: number) => obj => {
  const [, vy] = obj.velocity;
  const isFalling = !obj.isGrounded && vy > fallingForce;
  return state('falling', isFalling, obj);
};

export const stateJumping = (jumpingForce: number) => obj => {
  const [, vy] = obj.velocity;
  const isJumping = !obj.isGrounded && vy < -jumpingForce;
  return state('jumping', isJumping, obj);
};
