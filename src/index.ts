// ignore file coverage
import {pipe, pipeWith, random} from './utils';
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
  engine,
  jumpable,
  movable,
  hasRectangle,
} from './core';
import Input from './game/input-manager';
import {tag} from './core/tag';
import {coinCollision, coinEmitter} from './core/collision';
import {createAnimations2, unsafeUpdateAnimation} from './core/animations';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const fimg = new Image();
fimg.src = 'floor.png';

const himg = new Image();
himg.src = 'hills.png';

const cimg = new Image();
cimg.src = 'cover.png';

const climg = new Image();
cimg.src = 'cloud.png';

const timg = new Image();
timg.src = 'terrain.png';

const drawVec = draw(context);

// todo: export the entity later on for easy access to create more entities
// todo: add spritesheet information in separate (perhaps json file)
const arg = [
  {
    state: 'idle',
    src: 'Player.png',
    steps: 5,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    original_size: vector(32, 32),
    offset: [-8, -7],
  },
  {
    state: 'running',
    src: 'Player_Running.png',
    steps: 6,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    original_size: vector(32, 32),
    offset: [-8, -7],
  },
  {
    state: 'falling',
    src: 'Player_Falling.png',
    steps: 1,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    offset: [-8, -7],
  },
  {
    state: 'jumping',
    src: 'Player_Jumping.png',
    steps: 1,
    current: 1,
    size: vector(32, 32),
    scale: vector(2, 2),
    offset: [-8, -7],
  },
];
const arg2 = [
  {
    state: 'idle',
    src: 'Coin_Default.png',
    steps: 4,
    current: 1,
    size: vector(16, 16),
    scale: vector(1, 1),
    offset: [0, 0],
  },
  {
    state: 'alternative_idle',
    src: 'Coin.png',
    steps: 4,
    current: 1,
    size: vector(16, 16),
    scale: vector(2, 2),
    offset: [-4, -8],
  },
];

const state = state => boolean => p => {
  return {
    ...p,
    state: boolean ? state : p.state,
  };
};

let player = pipeWith(
  {},
  tag('player'),
  physics({position: [50, 50]}),
  size(32, 50),
  state('idle')(true),
  jumpable(14),
  movable(1),
  rectangle,
  createAnimations2(arg)
);

const coin = () =>
  pipeWith(
    {},
    tag('coin'),
    physics({
      position: [random(10, canvas.width - 30), random(10, canvas.height - 50)],
    }),
    size(16, 16),
    state(random(1, 2) == 1 ? 'idle' : 'alternative_idle')(true),
    // todo: find a better alternative
    rectangle,
    createAnimations2(arg2)
  );

let floor = pipeWith(
  {},
  tag('floor'),
  physics({position: [0, canvas.height - 20]}),
  size(canvas.width, 20),
  rectangle
);

const platform = () =>
  pipeWith(
    {},
    tag('platform'),
    physics({
      position: [random(0, canvas.width), random(0, canvas.height)],
    }),
    size(random(50, 100), random(10, 20)),
    rectangle
  );

let coins = Array(1).fill(true).map(coin);
let platforms = Array(10).fill(true).map(platform);

const stayTopBounds = obj => {
  if (obj.bottom <= 0) {
    return {
      ...obj,
      position: [random(0, canvas.width - obj.width), canvas.height],
    };
  }
  return obj;
};

const gameBounds = obj => {
  // rectangle checks for physics and size
  if (!hasRectangle(obj)) {
    throw new Error('the object must have the rectangle properties');
  }
  if (obj.right >= canvas.width) {
    return addForce(vector(-10, 0), obj);
  }
  if (obj.left <= 0) {
    return addForce(vector(10, 0), obj);
  }
  if (obj.top <= 0) {
    return {
      ...obj,
      position: [random(0, canvas.width - obj.width - 20), canvas.height - 100],
      velocity: [0, 0],
      acceleration: [0, 0],
    };
  }
  return obj;
};

const runningState = (speed: number) => player => {
  const [vx] = player.velocity;
  const isRunning = vx < -speed || (vx > speed && player.isGrounded);
  return state('running')(isRunning)(player);
};

const fallingState = (fallingForce: number) => player => {
  const [, vy] = player.velocity;
  const isFalling = !player.isGrounded && vy > fallingForce;
  return state('falling')(isFalling)(player);
};

const jumpingState = (jumpingForce: number) => player => {
  const [, vy] = player.velocity;
  const isJumping = !player.isGrounded && vy < -jumpingForce;
  return state('jumping')(isJumping)(player);
};

const idleState = state('idle')(true);

// todo: this is a timer, find a more PURE way to deal with this
// works good tough
let time = 10; // in seconds
function timer() {
  if (time === 0) {
    coinEmitter.emit('gameover');
    return;
  }
  time--;
  setTimeout(timer, 1000);
}

timer();

// todo: maybe look for a destroy method (atm it is impure)
// will see for a better implementation

// todo: find a better implementation for the score
let score = 0;
coinEmitter.on('coin', cur => {
  score++;
  const destroyed = coins.filter(c => c !== cur);
  const maxScreens = coins.length - 1 > 50;
  if (maxScreens) {
    coins = destroyed;
    return;
  }
  coins = [...destroyed, ...Array(3).fill(true).map(coin)];
});

let frames = 0; // frames here? maybe I can do something about this
engine(() => {
  player = pipeWith(
    player,
    updatePhysics(0.1),
    movement(Input.getAxisX()),
    jump(Input.getAxisY()),
    gravity(1),
    rectangle,
    pipe(...platforms.map(collision)),
    collision(floor),
    pipe(...coins.map(coinCollision)),
    gameBounds,
    idleState,
    runningState(2),
    jumpingState(-10),
    fallingState(5),
    unsafeUpdateAnimation(~~frames)
  );

  floor = pipeWith(floor, updatePhysics(0.1), rectangle);

  const platformUpdate = pipe(
    updatePhysics(0.1),
    gravity(-0.2),
    rectangle,
    stayTopBounds
  );
  platforms = platforms.map(platformUpdate);

  const coinUpdate = pipe(unsafeUpdateAnimation(~~frames / 1.5));

  coins = coins.map(coinUpdate).filter(c => !c.destroyed);

  frames++;

  // @ts-ignore
  window.coins = coins;
})();

engine(t => {
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#6eb9f9';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#181818';

  context.globalAlpha = 0.8;
  context.drawImage(climg, 0, 30, 288, 208, 0, 40, 288 * 3, 208 * 3);
  context.globalAlpha = 1;

  context.globalAlpha = 0.8;
  context.drawImage(cimg, 0, 0, 288, 208, 0, 40, 288 * 3, 208 * 3);
  context.globalAlpha = 1;
  context.drawImage(himg, 0, 15, 288, 208, 0, 40, 288 * 3, 208 * 3);
  context.drawImage(fimg, 0, 0, 288, 208, 0, 0, 288 * 3, 208 * 3);

  const [px, py] = player.position;

  const [vx] = player.velocity;
  const [sw, sh] = player.animation.localSize;

  const [fpx, fpy] = player.animation.position;

  if (vx < 0) {
    context.save();
    context.translate(fpx + sw / 2, fpy + sh / 2);
    context.scale(-1, 1);
    context.translate(-(fpx + sw / 2), -(fpy + sh / 2));
  }

  // todo: add a way to draw image on something that has the animations properties
  context.drawImage(
    player.animation.image,
    player.current * player.animation.size[0],
    0,
    player.animation.size[0],
    player.animation.size[0],
    player.animation.position[0],
    player.animation.position[1],
    player.animation.localSize[0],
    player.animation.localSize[1]
  );
  context.restore();
  context.strokeStyle = '#4e62e0';
  context.strokeRect(px, py, player.width, player.height);

  coins.forEach(coin => {
    context.strokeRect(
      coin.position[0],
      coin.position[1],
      coin.width,
      coin.height
    );
    context.drawImage(
      coin.animation.image,
      coin.current * coin.animation.size[0],
      0,
      coin.animation.size[0],
      coin.animation.size[0],
      coin.animation.position[0],
      coin.animation.position[1],
      coin.animation.localSize[0],
      coin.animation.localSize[1]
    );
  });

  platforms.forEach(platform => {
    context.fillRect(
      platform.position[0],
      platform.position[1],
      platform.width,
      platform.height
    );
  });

  context.drawImage(timg, 100, 0, 288, 208, 0, 420, 288 * 3, 208 * 3);
  context.drawImage(timg, 0, 0, 288, 208, 500, 420, 288 * 3, 208 * 3);

  // todo: ui is gross as fuck
  context.font = '28px system-ui';
  context.fillText(`Score: ${score}`, 100, 100);
  context.fillText(`Time: ${time}`, 100, 150);

  drawVec(player.velocity)(
    vector(
      player.position[0] + player.width / 2,
      player.position[1] + player.height / 2
    ),
    10,
    'red'
  );

  // @ts-ignore
  window.player = player;
})();

coinEmitter.on('gameover', () => {
  let id = window.requestAnimationFrame(function () {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
  // todo: update ui
  context.globalAlpha = 0.8;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.fillStyle = '#fff';
  context.fillText('Game Over', canvas.width / 2.4, canvas.height / 2);
  context.fillText(
    `Avec un score de ${score}`,
    canvas.width / 2.8,
    canvas.height / 1.7
  );
});
