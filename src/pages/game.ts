import $ from 'jquery';
import {createGame} from '../core';
import {app} from '../components/app';
import {setPlayer} from '../core/info';

export function createGamePage() {
  const game = $('#game');
  if (game.length > 0) {
    game.remove();
  }
  const canvas = $(`<canvas id='game' width='800' height='600' />`);
  createGame(canvas);
  return canvas;
}

export function setGamePage(playerName) {
  setPlayer(playerName);
  const game: any = createGamePage();
  app.html(game);
}
