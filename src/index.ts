import physics, {addForce, updatePhysics} from './core/physics';
import engine from './core/engine';
import {compose} from 'ramda';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

let player = {
  ...physics(1, [50, 50]),
};

const gravity = 1;
const playerPhysics = compose(updatePhysics, addForce([0, gravity]));

engine((_) => {
  player = playerPhysics(player);
})();

engine((_) => {
  context.globalAlpha = 0.8;
  context.fillStyle = '#d2d2d2';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#181818';
  context.fillRect(player.position[0], player.position[1], 64, 96);
})();
