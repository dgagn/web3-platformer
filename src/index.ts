// ignore file coverage
import {pipe, pipeWith, random} from './utils';
import {
  addForce,
  physics,
  updatePhysics,
  size,
  rectangle,
  jump,
  movement,
  gravity,
  collision,
  vector,
  engine,
  jumpable,
  movable,
  hasRectangle,
} from './core';
import Input from './game/input-manager';
import {tag} from './core/tag';
import {coinCollision, coinEmitter} from './core/collision';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from './core/animation';
import {playerSprite} from './player/sprites';
import {coinSprite} from './sprites/coin';
import {platformSprite} from './sprites/platform';
import {state} from './core/state';
import {coinSound, createSound, playSoundOnState} from './core/sound';
import {playerSound} from './player/sounds';
import {uiSprite} from './sprites/ui';
import {createGame} from './core/game';
import $ from 'jquery';
import {
  stateFalling,
  stateIdle,
  stateJumping,
  stateRunning,
} from './player/states';
import {constraintBounds, fromTopBoundsToBottom} from './core/bounds';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const can = $(`<canvas width='800' height='600' />`);
const game = createGame(can);
console.log(game);

const bimg = new Image();
bimg.src = 'wall.png';

const fimg = new Image();
fimg.src = 'cols.png';

// todo: export the entity later on for easy access to create more entities

let player = pipeWith(
  {},
  tag('player'),
  physics({position: [48, 48]}),
  size(32, 50),
  state('idle', true),
  jumpable(14),
  movable(1),
  rectangle,
  createAnimations(playerSprite),
  createSound(playerSound)
);

const coin = () =>
  pipeWith(
    {},
    tag('coin'),
    physics({
      position: [random(10, canvas.width - 30), random(10, canvas.height - 50)],
    }),
    size(16, 16),
    state(random(1, 2) == 1 ? 'idle' : 'idle_alt', true),
    rectangle,
    createAnimations(coinSprite),
    createSound(coinSound)
  );

let timerUi = pipeWith(
  {},
  physics({position: [48, 48]}),
  size(24, 24),
  state('timer', true),
  createAnimations(uiSprite)
);

let coinUi = pipeWith(
  {},
  physics({position: [48, 100]}),
  size(24, 24),
  state('coin', true),
  createAnimations(uiSprite)
);

let floor = pipeWith(
  {},
  tag('floor'),
  physics({position: [0, canvas.height - 20]}),
  size(canvas.width, 20),
  rectangle
);

const platform = () =>
  pipeWith(
    {},
    tag('platform'),
    physics({
      position: [random(0, canvas.width), random(0, canvas.height)],
    }),
    size(64, 16),
    rectangle,
    state(random(1, 2) === 1 ? 'idle' : 'idle_alt')(true),
    createAnimations(platformSprite)
  );

let coins = Array(1).fill(true).map(coin);
let platforms = Array(10).fill(true).map(platform);

// todo: this is a timer, find a more PURE way to deal with this
// works good tough
let time = 90; // in seconds
function timer() {
  if (time === 0) {
    coinEmitter.emit('gameover');
    return;
  }
  time--;
  setTimeout(timer, 1000);
}

timer();

// todo: maybe look for a destroy method (atm it is impure)
// will see for a better implementation

// todo: find a better implementation for the score

const MAXCOINS = 50;
let score = 0;
coinEmitter.on('coin', cur => {
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

let frames = 0; // frames here? maybe I can do something about this
engine(() => {
  player = pipeWith(
    player,
    updatePhysics(0.1),
    movement(Input.getAxisX()),
    jump(Input.getAxisY()),
    gravity(1),
    rectangle,
    pipe(...platforms.map(collision)),
    collision(floor),
    pipe(...coins.map(coinCollision)),
    constraintBounds([canvas.width, canvas.height]),
    stateIdle,
    stateRunning(2),
    stateJumping(-10),
    stateFalling(5),
    unsafeUpdateAnimation(~~frames),
    playSoundOnState('running')
  );

  timerUi = pipeWith(timerUi, unsafeUpdateAnimation(~~frames));
  coinUi = pipeWith(coinUi, unsafeUpdateAnimation(~~frames));

  floor = pipeWith(floor, updatePhysics(0.1), rectangle);

  const platformUpdate = pipe(
    updatePhysics(0.1),
    gravity(-0.2),
    rectangle,
    fromTopBoundsToBottom([canvas.width, canvas.height]),
    unsafeUpdateAnimation(~~frames)
  );
  platforms = platforms.map(platformUpdate);

  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));

  coins = coins.map(coinUpdate).filter(c => !c.destroyed);

  frames++;

  // @ts-ignore
  window.coins = coins;
})();

engine(() => {
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#676670';
  context.globalAlpha = 0.3;
  context.drawImage(
    bimg,
    player.position[0] / 40,
    0,
    288,
    208,
    0,
    40,
    288 * 3,
    208 * 3
  );
  context.drawImage(
    fimg,
    player.position[0] / 40,
    0,
    288,
    208,
    0,
    40,
    288 * 3,
    208 * 3
  );
  context.globalAlpha = 1;

  const [vx] = player.velocity;
  const [sw, sh] = player.animation.localSize;

  const [fpx, fpy] = player.animation.position;

  if (vx < 0) {
    context.save();
    context.translate(fpx + sw / 2, fpy + sh / 2);
    context.scale(-1, 1);
    context.translate(-(fpx + sw / 2), -(fpy + sh / 2));
  }
  context.strokeStyle = '#4e62e0';
  drawSprite(context, player);
  context.restore();
  coins.forEach(coin => drawSprite(context, coin));
  platforms.forEach(platform => drawSprite(context, platform));
  drawSprite(context, timerUi);
  drawSprite(context, coinUi);
  // todo: ui is gross as fuck
  context.font = '24px system-ui';
  context.fillText(`${time}`, 88, 68);
  context.fillText(`${score}`, 88, 120);

  context.fillStyle = '#381010';
  context.globalAlpha = 0.4;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;

  // @ts-ignore
  window.player = player;
})();

coinEmitter.on('gameover', () => {
  let id = window.requestAnimationFrame(() => {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
  // todo: update ui
  context.globalAlpha = 0.8;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#fff';
  context.fillText('Game Over', canvas.width / 2.4, canvas.height / 2);
  context.fillText(
    `Avec un score de ${score}`,
    canvas.width / 2.8,
    canvas.height / 1.7
  );
});

// todo: fix player jump sound
coinEmitter.on('jump', () => {
  player.sounds.filter(sound => sound.state === 'jumping')[0].audio.play();
});

// todo: fix game music sound
const audio = new Audio('music.ogg');
audio.loop = true;
audio.volume = 0.5;
document.addEventListener('mousemove', () => audio.play().catch(e => e));
document.addEventListener('keydown', () => audio.play().catch(e => e));
