// ignore file coverage
import {createGame} from './core/game';
import $ from 'jquery';

const can = $(`<canvas width='800' height='600' />`);
// @ts-ignore
$('body').html(can);
createGame(can);

// todo: fix game music sound
const audio = new Audio('music.ogg');
audio.loop = true;
audio.volume = 0.5;
document.addEventListener('mousemove', () => audio.play().catch(e => e));
document.addEventListener('keydown', () => audio.play().catch(e => e));
