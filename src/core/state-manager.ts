import {state} from './state';

/**
 * The idle state.
 *
 * @function
 * @param {Object} - the entity to apply the idle
 * state to
 */
export const stateIdle = state('idle', true);

/**
 * The running state on a certain speed.
 *
 * @param {number} speed - the speed threshold to change
 * to the running state
 * @return {EntityCB} - a entity callback with the
 * correct state
 */
export function stateRunning(speed) {
  return obj => {
    const [vx] = obj.velocity;
    const isRunning = vx < -speed || (vx > speed && obj.isGrounded);
    return state('running', isRunning, obj);
  };
}

/**
 * The falling state on a certain falling force Y.
 *
 * @param {number} fallingForce - the falling force threshold to change
 * to the falling state
 * @return {EntityCB} - a entity callback with the
 * correct state
 */
export function stateFalling(fallingForce) {
  return obj => {
    const [, vy] = obj.velocity;
    const isFalling = !obj.isGrounded && vy > fallingForce;
    return state('falling', isFalling, obj);
  };
}

/**
 * The falling state on a certain jumping force Y.
 *
 * @param {number} jumpingForce - the jumping force threshold to change
 * to the falling state
 * @return {EntityCB} - a entity callback with the
 * correct state
 */
export function stateJumping(jumpingForce) {
  return obj => {
    const [, vy] = obj.velocity;
    const isJumping = !obj.isGrounded && vy < -jumpingForce;
    return state('jumping', isJumping, obj);
  };
}
