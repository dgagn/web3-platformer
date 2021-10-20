import {vector} from '../core';

export const platformSprite = [
  {
    state: 'idle',
    src: 'platform/platform.png',
    steps: 1,
    current: 1,
    size: vector(64, 16),
    scale: vector(1, 1),
    offset: [0, 0],
  },
  {
    state: 'idle_alt',
    src: 'platform/platform_alt.png',
    steps: 1,
    current: 1,
    size: vector(64, 16),
    scale: vector(1, 1),
    offset: [0, 0],
  },
];
