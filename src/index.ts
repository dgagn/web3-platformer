// ignore file coverage
import {pipe, pipeWith} from './utils';
import {
  collision,
  engine,
  gravity,
  jump,
  movement,
  rectangle,
  updatePhysics,
} from './core';
import Input from './core/input-manager';
import {coinCollision, coinEmitter} from './core/collision';
import {drawSprite, unsafeUpdateAnimation} from './core/animation';
import {playSoundOnState} from './core/sound';
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

createGame(can);
const body = $('body');
body.html(can);

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
    `Avec un score de ${0}`,
    canvas.width / 2.8,
    canvas.height / 1.7
  );
});

// todo: fix game music sound
const audio = new Audio('music.ogg');
audio.loop = true;
audio.volume = 0.5;
document.addEventListener('mousemove', () => audio.play().catch(e => e));
document.addEventListener('keydown', () => audio.play().catch(e => e));
