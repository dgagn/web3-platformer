import {draw, game} from '../core/game';

draw(context => {
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, game.canvas.width, game.canvas.height);
  context.globalAlpha = 1;
});
