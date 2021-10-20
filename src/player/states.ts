import {state} from '../core/state';

const stateIdle = state('idle', true);

const stateRunning = (speed: number) => obj => {
  const [vx] = obj.velocity;
  const isRunning = vx < -speed || (vx > speed && obj.isGrounded);
  return state('running', isRunning, obj);
};

const stateFalling = (fallingForce: number) => obj => {
  const [, vy] = obj.velocity;
  const isFalling = !obj.isGrounded && vy > fallingForce;
  return state('falling', isFalling, obj);
};

const stateJumping = (jumpingForce: number) => obj => {
  const [, vy] = obj.velocity;
  const isJumping = !obj.isGrounded && vy < -jumpingForce;
  return state('jumping', isJumping, obj);
};
