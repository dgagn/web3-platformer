import engine from './core/engine';
import pipe from './utils/pipe';
import {addForce, physics, updatePhysics} from './core/physics';
import size from './core/size';
import compose from './utils/compose';
import {draw, text, vector} from './core/vector';
import Input from './game/input-manager';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const drawVec = draw(context);
const textVec = text(context);

let player = pipe(
    physics({position: [50, 50]}),
    size(32, 64),
)({
  isGrounded: false,
  speed: 1,
  jumpForce: 30,
});

const movement = (player) =>
  addForce(vector(Input.getAxisX() * player.speed, 0))(player);

const gravity = (gravity) => (player) => addForce(vector(0, gravity))(player);

engine((t) => {
  player = compose(updatePhysics(0.1), movement)(player);
})();

engine((t) => {
  context.fillStyle = '#d2d2d2';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#181818';
  const [px, py] = player.position;
  context.fillRect(px, py, player.width, player.height);

  drawVec(player.velocity)(
      vector(
          player.position[0] + player.width / 2,
          player.position[1] + player.height / 2,
      ),
      10,
      'red',
  );
  textVec(player.velocity)(vector(400, 400), 'velocity');
  textVec(player.position)(vector(400, 415), 'position');
})();
