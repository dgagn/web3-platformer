import {vector} from '../core/vector';

/**
 * The player sprites.
 * @type {Sprite[]}
 */
export const spritePlayer = [
  {
    state: 'idle',
    src: 'player/player_idle.png',
    steps: 5,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    offset: [-8, -7],
  },
  {
    state: 'running',
    src: 'player/player_running.png',
    steps: 6,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    offset: [-8, -7],
  },
  {
    state: 'falling',
    src: 'player/player_falling.png',
    steps: 1,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    offset: [-8, -7],
  },
  {
    state: 'jumping',
    src: 'player/player_jumping.png',
    steps: 1,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    offset: [-8, -7],
  },
];
