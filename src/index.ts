import physics, {addForce, updatePhysics} from './core/physics';
import engine from './core/engine';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

let player = {
  ...physics(),
};

engine((_) => {
  player = updatePhysics(player);
})();

setInterval(() => {
  player = addForce(player, 1, [1, 0]);
}, 1000);

engine((_) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(player.position[0], player.position[1], 64, 96);
})();
