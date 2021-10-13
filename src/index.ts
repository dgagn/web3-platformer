import {pipe, random} from './utils';
import {
  addForce,
  physics,
  updatePhysics,
  size,
  rectangle,
  jump,
  movement,
  gravity,
  collision,
  vector,
  draw,
  text,
  engine,
} from './core';
import Input from './game/input-manager';
import {createAnimations} from './core/animations';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const playerImage = new Image();
playerImage.src = 'Player.png';
const playerRunning = new Image();
playerRunning.src = 'Player_Running.png';
const playerFalling = new Image();
playerFalling.src = 'Player_Falling.png';
const playerJumping = new Image();
playerJumping.src = 'Player_Jumping.png';

const drawVec = draw(context);
const textVec = text(context);

const arg = [
  {
    state: 'idle',
    src: 'Player.png',
    steps: 5,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
  },
  {
    state: 'running',
    src: 'Player_Running.png',
    steps: 6,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
  },
  {
    state: 'falling',
    src: 'Player_Falling.png',
    steps: 1,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
  },
  {
    state: 'jumping',
    src: 'Player_Jumping.png',
    steps: 1,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
  },
];

const state = (state) => (boolean) => (p) => {
  return {
    ...p,
    state: boolean ? state : p.state,
  };
};

const jumper = (jumpForce: number) => (p) => {
  return {
    ...p,
    isGrounded: false,
    jumpForce: jumpForce,
  };
};

const mover = (speed: number) => (p) => {
  return {
    ...p,
    speed,
  };
};

let player = pipe(
    physics({position: [50, 50]}),
    size(32, 50),
    state('idle')(true),
    jumper(14),
    mover(1),
    rectangle,
)({});

let floor = pipe(
    physics({position: [0, canvas.height - 20]}),
    size(canvas.width, 20),
    rectangle,
)({});

let platforms = Array(10)
    .fill(true)
    .map((_) =>
      pipe(
          physics({
            position: [random(0, canvas.width), random(0, canvas.height)],
          }),
          size(random(50, 100), random(10, 20)),
          rectangle,
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

const runningState = (speed: number) => (player) => {
  const [vx] = player.velocity;
  const isRunning = vx < -speed || (vx > speed && player.isGrounded);
  return state('running')(isRunning)(player);
};

const fallingState = (fallingForce: number) => (player) => {
  const [, vy] = player.velocity;
  const isFalling = !player.isGrounded && vy > fallingForce;
  return state('falling')(isFalling)(player);
};

const jumpingState = (jumpingForce: number) => (player) => {
  const [, vy] = player.velocity;
  const isJumping = !player.isGrounded && vy < -jumpingForce;
  return state('jumping')(isJumping)(player);
};

const idleState = state('idle')(true);

engine((t) => {
  const playerUpdate = pipe(
      updatePhysics(0.1),
      movement(Input.getAxisX()),
      jump(Input.getAxisY()),
      gravity(1),
      rectangle,
      pipe(...platforms.map((p) => collision(p))),
      collision(floor),
      gameBounds,
      idleState,
      runningState(2),
      jumpingState(-10),
      fallingState(5),
      createAnimations(arg),
  );

  const platformUpdate = pipe(
      updatePhysics(0.1),
      gravity(-0.2),
      rectangle,
      stayTopBounds,
  );

  const floorUpdate = pipe(updatePhysics(0.1), rectangle);

  player = playerUpdate(player);
  platforms = platforms.map((p) => platformUpdate(p));
  floor = floorUpdate(floor);
})();

const stepWidth = 32;
let step = 0;
let frames = 0;
engine((t) => {
  context.globalAlpha = 0.6;
  context.imageSmoothingEnabled = false;

  context.fillStyle = '#d2d2d2';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#181818';
  const [px, py] = player.position;

  const [vx] = player.velocity;
  const [sw, sh] = vector(64, 64);

  const image =
    player.state === 'running' ?
      playerRunning :
      player.state === 'falling' ?
      playerFalling :
      player.state === 'jumping' ?
      playerJumping :
      playerImage;

  const [fpx, fpy] = [px - 15, py - 14];
  if (vx < 0) {
    context.save();
    context.translate(fpx + sw / 2, fpy + sh / 2); //  déplace notre point de rotation
    context.scale(-1, 1);
    context.translate(-(fpx + sw / 2), -(fpy + sh / 2));
  }
  const maxSteps =
    image === playerImage ?
      5 :
      image === playerRunning ?
      5 :
      image === playerFalling ?
      1 :
      image === playerJumping ?
      1 :
      0;

  if (frames % maxSteps == 0) {
    step = step < maxSteps - 1 ? step + 1 : 0;
  }

  context.drawImage(
      player.animation.image,
      player.animation.current * stepWidth,
      0,
      32,
      32,
      fpx,
      fpy,
      sw,
      sh,
  );
  context.restore();
  context.strokeStyle = '#4e62e0';
  context.strokeRect(px, py, player.width, player.height);
  context.strokeStyle = '#000';

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
  frames++;
})();
