import $ from 'jquery';
import {createGame} from '../core';
import {app} from '../components/app';
import {eventPlayButton} from '../components/btn';
import {parallax} from '../components/parallax';
import {createHomePage} from './home';
import {setPlayer} from '../core/info';

export function createGamePage() {
  const canvas = $(`<canvas id='game' width='800' height='600' />`);
  createGame(canvas);
  return canvas;
}

export function setGamePage(playerName) {
  setPlayer(playerName);
  const game: any = createGamePage();
  app.html(game);
}
