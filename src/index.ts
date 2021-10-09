import physics, {addForce, updatePhysics} from './core/physics';

import engine from './core/engine';
import {compose} from 'ramda';
import vector, {scale} from './core/vector';
import Input from './game/input-manager';
import {forceCollision, jump} from './game/player';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const gravity = 1.5;

let player = {
  ...physics(1, [50, 50]),
  movementSpeed: 2,
  width: 32,
  height: 64,
  isGrounded: false,
};

const platformSize = {
  width: canvas.width,
  height: 20,
};

const platform = {
  ...platformSize,
  ...physics(0, [0, canvas.height - platformSize.height]),
};

engine((t) => {
  // @ts-ignore
  player = compose(
      updatePhysics,
      addForce(scale(vector(Input.getAxisX() * player.movementSpeed, 0), t)),
      jump,
      forceCollision(platform),
      addForce(scale(vector(0, gravity), t)),
  )(player);
})();

engine((t) => {
  context.fillStyle = '#d2d2d2';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#181818';
  const [px, py] = player.position;
  context.fillRect(px, py, 32, 64);
  const [platx, platy] = platform.position;
  context.fillStyle = '#8a5a5a';
  context.fillRect(platx, platy, platform.width, platform.height);
});

const drawVector =
  ([vx, vy]) =>
    ([x, y], n, color) => {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + vx * n, y + vy * n);
      context.strokeStyle = color;
      context.stroke();
      context.closePath();
    };

engine(() => {
  const vec = drawVector(player.velocity);
  vec(
      vector(
          player.position[0] + player.width / 2,
          player.position[1] + player.height / 2,
      ),
      10,
      'red',
  );
  context.fillText(
      `vx: ${~~player.velocity[0]}, vy: ${~~player.velocity[1]}`,
      400,
      420,
  );
  context.fillText(
      `x: ${~~player.position[0]}, y: ${~~player.position[1]}`,
      400,
      400,
  );
  context.fillText(`isGrounded: ${player.isGrounded}`, 400, 440);
})();
