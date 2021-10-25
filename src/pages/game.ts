import $ from 'jquery';
import {createGame} from '../core';

export function createGamePage() {
  const canvas = $(`<canvas width='800' height='600' />`);
  createGame(canvas);
  return canvas;
}
