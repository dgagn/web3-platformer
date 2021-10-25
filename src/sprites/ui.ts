import {vector} from '../core/vector';

export const spriteUi = [
  {
    state: 'timer',
    src: 'ui.png',
    steps: 1,
    offset: vector(0, 0),
    current: 1,
    size: vector(8, 8),
    scale: vector(3, 3),
  },
  {
    state: 'coin',
    src: 'ui.png',
    steps: 1,
    offset: vector(0, 0),
    current: 1,
    size: vector(8, 8),
    scale: vector(3, 3),
    yoffset: 8,
  },
];
