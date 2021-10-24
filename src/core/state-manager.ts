import {state} from './state';

export const stateIdle = state('idle', true);

export function stateRunning(speed: number) {
  return obj => {
    const [vx] = obj.velocity;
    const isRunning = vx < -speed || (vx > speed && obj.isGrounded);
    return state('running', isRunning, obj);
  };
}

export function stateFalling(fallingForce: number) {
  return obj => {
    const [, vy] = obj.velocity;
    const isFalling = !obj.isGrounded && vy > fallingForce;
    return state('falling', isFalling, obj);
  };
}

export function stateJumping(jumpingForce: number) {
  return obj => {
    const [, vy] = obj.velocity;
    const isJumping = !obj.isGrounded && vy < -jumpingForce;
    return state('jumping', isJumping, obj);
  };
}
