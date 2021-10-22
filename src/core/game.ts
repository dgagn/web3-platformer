import {emitter} from './emitter';

const createGame = id => {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const context = canvas.getContext('2d');
  return {
    ...emitter(),
    canvas,
    context,
    draws: [],
    update: [],
  };
};

export const game = createGame('canvas');

export const draw = fn => {
  game.draws.push(fn);
};

export const update = fn => {
  game.update.push(fn);
};

export const engine = () => {
  let frames = 0;
  const cb = () => {
    requestAnimationFrame(cb);
    game.update.forEach(f => f(~~frames));
    game.draws.forEach(f => f(game.context));
    frames++;
  };
  return cb;
};
