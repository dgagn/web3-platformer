import engine from './core/engine';
import pipe from './core/pipe';
import {addForce, physics, updatePhysics} from './core/physics';
import size from './core/size';
import {draw, text, vector} from './core/vector';
import Input from './game/input-manager';
import {rectangle} from './core/rectangle';
import {collision} from './core/collision';
import random from './core/random';

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
  jumpForce: 14,
});

let floor = pipe(
    physics({position: [0, canvas.height - 20]}),
    size(canvas.width, 20),
)({});

let platforms = Array(10)
    .fill(true)
    .map((_) =>
      pipe(
          physics({position: [random(0, canvas.width), random(0, canvas.height)]}),
          size(random(50, 100), random(10, 20)),
      )({}),
    );

const stayTopBounds = (p) => {
  if (p.bottom <= 0) {
    return {
      ...p,
      position: [random(0, canvas.width - p.width), canvas.height],
    };
  }
  return p;
};

const gameBounds = (p) => {
  if (p.right >= canvas.width) {
    return addForce(vector(-10, 0))(p);
  }
  if (p.left <= 0) {
    return addForce(vector(10, 0))(p);
  }
  if (p.top <= 0) {
    return {
      ...p,
      position: [random(0, canvas.width - p.width - 20), canvas.height - 100],
      velocity: [0, 0],
      acceleration: [0, 0],
    };
  }
  return p;
};

const movement = (player) =>
  addForce(vector(Input.getAxisX() * player.speed, 0))(player);

const jump = (player) =>
  player.isGrounded ?
    {
      ...addForce(vector(0, Input.getAxisY() * player.jumpForce))(player),
      isGrounded: false,
    } :
    player;

const gravity = (gravity) => (player) => addForce(vector(0, gravity))(player);

const invertGravity = (gravity) => (player) =>
  addForce(vector(0, -gravity))(player);

engine((t) => {
  const playerUpdate = pipe(
      updatePhysics(0.1),
      movement,
      jump,
      gravity(1),
      rectangle,
      pipe(...platforms.map((p) => collision(p))),
      collision(floor),
      gameBounds,
  );

  const platformUpdate = pipe(
      updatePhysics(0.1),
      invertGravity(0.2),
      rectangle,
      stayTopBounds,
  );

  const floorUpdate = pipe(updatePhysics(0.1), rectangle);

  player = playerUpdate(player);
  platforms = platforms.map((p) => platformUpdate(p));
  floor = floorUpdate(floor);
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

  context.fillRect(
      floor.position[0],
      floor.position[1],
      floor.width,
      floor.height,
  );

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
