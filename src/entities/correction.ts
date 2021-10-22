import {draw, game} from '../core/game';

draw(context => {
  context.fillStyle = '#381010';
  context.globalAlpha = 0.4;
  context.fillRect(0, 0, game.canvas.width, game.canvas.height);
  context.globalAlpha = 1;
});
