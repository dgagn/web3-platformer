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

export const engine = fn => {
  let frames = 0;
  const cb = () => {
    requestAnimationFrame(cb);
    fn(~~frames);
    frames++;
  };
  return cb;
};

export const draws = engine(() => {
  game.draws.forEach(f => f(game.context));
});

export const updates = engine(frames => {
  console.log(frames);
  game.update.forEach(f => f(frames));
});
