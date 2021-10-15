web3-platformer

player

```js
const player = {
  // Physics
  mass: 1,
  position: [0, 0],
  velocity: [0, 0],
  acceleration: [0, 0],
  oldpos: [0, 0],

  // Size
  width: 0,
  height: 0,

  // Jumpable
  jumpForce: 0,
  isGrounded: false,

  // Movable
  speed: 0,

  // Tag
  tag: 'player',

  // Rectangle
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  oldtop: 0,
  oldbottom: 0,
  oldleft: 0,
  oldright: 0,

  // Animation
  animation: {
    state: 'idle',
    sprite: Image,
    position: [0, 0],
    scale: [2, 2],
    ogsize: [32, 32],
    size: [64, 64],
    offset: [-15, -14],
    src: 'Player.png',
    steps: 5,
    current: 1,
  },
};
```
