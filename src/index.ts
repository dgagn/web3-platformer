// ignore file coverage
import {pipe, pipeWith} from './utils';
import {
  updatePhysics,
  rectangle,
  jump,
  movement,
  gravity,
  collision,
  engine,
} from './core';
import Input from './core/input-manager';
import {coinCollision, coinEmitter} from './core/collision';
import {drawSprite, unsafeUpdateAnimation} from './core/animation';
import {coinSound, createSound, playSoundOnState} from './core/sound';
import {createGame} from './core/game';
import $ from 'jquery';
import {
  stateFalling,
  stateIdle,
  stateJumping,
  stateRunning,
} from './core/state-manager';
import {constraintBounds, fromTopBoundsToBottom} from './core/bounds';
import {createCoinUI, createTimerUI} from './entities/ui';
import {createPlayer} from './entities/player';
import {createFloor} from './entities/floor';
import {createPlatform} from './entities/platforms';
import {createCoin} from './entities/coins';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const can = $(`<canvas width='800' height='600' />`);
const game = createGame(can);
console.log(game);

const bimg = new Image();
bimg.src = 'wall.png';

const fimg = new Image();
fimg.src = 'cols.png';

let player = createPlayer();
let timerUi = createTimerUI();
let coinUi = createCoinUI();
let floor = createFloor(canvas);

const coin = () => createCoin(canvas);
const platform = () => createPlatform(canvas);

let coins = Array(1).fill(true).map(coin);
let platforms = Array(10).fill(true).map(platform);

let time = 90; // in seconds
export function timer() {
  if (time === 0) {
    coinEmitter.emit('gameover');
    return;
  }
  time--;
  setTimeout(timer, 1000);
}

timer();

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
    constraintBounds(canvas),
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
    fromTopBoundsToBottom(canvas),
    unsafeUpdateAnimation(~~frames)
  );
  platforms = platforms.map(platformUpdate);

  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));

  coins = coins.map(coinUpdate).filter(c => !c.destroyed);

  frames++;
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
