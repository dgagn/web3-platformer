import engine from './core/engine';
import pipe from './core/pipe';
import {addForce, physics, updatePhysics} from './core/physics';
import size from './core/size';
import {draw, text, vector} from './core/vector';
import Input from './game/input-manager';
import {rectangle} from './core/rectangle';
import {collision} from './core/collision';

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
  jumpForce: 3,
});

const platform = pipe(physics({position: [50, 550]}), size(200, 64))({});
const platform2 = pipe(physics({position: [200, 450]}), size(200, 64))({});
let platforms = [platform, platform2];

const movement = (player) =>
  addForce(vector(Input.getAxisX() * player.speed, 0))(player);

const jump = (player) =>
  addForce(vector(0, Input.getAxisY() * player.jumpForce))(player);

const gravity = (gravity) => (player) => addForce(vector(0, gravity))(player);

engine((t) => {
  player = pipe(
      updatePhysics(0.1),
      movement,
      jump,
      gravity(1),
      rectangle,
  )(player);

  player = pipe(...platforms.map((p) => collision(p)))(player);

  platforms = platforms.map((p) => pipe(updatePhysics(0.1), rectangle)(p));
})();

engine((t) => {
  context.globalAlpha = 0.5;
  context.fillStyle = '#d2d2d2';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#181818';
  const [px, py] = player.position;
  context.fillRect(px, py, player.width, player.height);

  platforms.forEach((platform) => {
    context.fillRect(
        platform.position[0],
        platform.position[1],
        platform.width,
        platform.height,
    );
  });

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
  // @ts-ignore
  window.player = player;
})();
