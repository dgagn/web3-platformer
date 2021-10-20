import {vector} from '../core';

export const coinSprite = [
  {
    state: 'idle',
    src: 'coin/coin.png',
    steps: 4,
    current: 1,
    size: vector(16, 16),
    scale: vector(1, 1),
    offset: [0, 0],
  },
  {
    state: 'idle_alt',
    src: 'coin/coin_alt.png',
    steps: 4,
    current: 1,
    size: vector(16, 16),
    scale: vector(2, 2),
    offset: [-4, -8],
  },
];
