import {pipe, pipeWith, random} from '../utils';
import {tag} from '../core/tag';
import {physics, rectangle, size} from '../core';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {coinSprite} from '../sprites/coin';
import {coinSound, createSound} from '../core/sound';
import {draw, game, update} from '../core/game';

const coin = () =>
  pipeWith(
    {},
    tag('coin'),
    physics({
      position: [
        random(10, game.canvas.width - 30),
        random(10, game.canvas.height - 50),
      ],
    }),
    size(16, 16),
    state(random(1, 2) == 1 ? 'idle' : 'idle_alt', true),
    rectangle,
    createAnimations(coinSprite),
    createSound(coinSound)
  );

export let coins = Array(1).fill(true).map(coin);

update(frames => {
  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));
  coins = coins.map(coinUpdate).filter(c => !c.destroyed);
});

draw(context => {
  coins.forEach(c => drawSprite(context, c));
});

const MAXCOINS = 50;
let score = 0;
game.on('coin', cur => {
  score++;
  cur.sounds
    .filter(sound => sound.name === 'coin')[0]
    ?.audio?.play()
    .catch(e => e);
  const destroyed = coins.filter(c => c !== cur);
  const maxScreens = coins.length - 1 > MAXCOINS;
  if (maxScreens) {
    coins = destroyed;
    return;
  }
  coins = [...destroyed, ...Array(2).fill(true).map(coin)];
});
