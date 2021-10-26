import $ from 'jquery';
import {createGame} from '../core';
import {app} from '../components/app';
import {setPlayer} from '../core/info';

/**
 * Creates the game page with a new canvas.
 *
 * @return {JQuery<HTMLElement>}
 */
export function createGamePage() {
  const game = $('#game');
  if (game.length > 0) {
    game.remove();
  }
  const canvas = $(`<canvas id='game' width='800' height='600' />`);
  createGame(canvas);
  return canvas;
}

/**
 * Sets the current page to the game page.
 * @param {string} playerName - the player name to set
 * to the local storage when changing to the game
 * page.
 */
export function setGamePage(playerName) {
  app.addClass('game');
  setPlayer(playerName);
  const game = createGamePage();
  // @ts-ignore
  app.html(game);
}
