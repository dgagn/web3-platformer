import {draw} from '../core/game';
import {player} from './player';

const bimg = new Image();
bimg.src = 'wall.png';

const fimg = new Image();
fimg.src = 'cols.png';

draw(context => {
  context.fillStyle = '#676670';
  context.globalAlpha = 0.3;
  context.drawImage(
    bimg,
    player.position[0] / 40,
    0,
    288,
    208,
    0,
    0,
    288 * 3,
    208 * 3
  );
  context.drawImage(
    fimg,
    player.position[0] / 40,
    0,
    288,
    208,
    0,
    0,
    288 * 3,
    208 * 3
  );
  context.globalAlpha = 1;
});
