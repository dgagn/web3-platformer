import {add, mult} from './vector';

// todo: add unit tests for animations
// todo: has animation properties
const state = (state) => (boolean) => (p) => {
  return {
    ...p,
    state: boolean ? state : p.state,
  };
};

let frames = 0;
let current = 0;
export const createAnimations = (states: any[]) => (obj) => {
  const animation = states.filter((s) => s.state === obj.state)[0] ?? {};
  const image = new Image();
  image.src = animation.src;
  if (frames % animation.steps == 0) {
    current = current < animation.steps - 1 ? current + 1 : 0;
  }
  frames++;
  return {
    ...obj,
    animation: {
      ...animation,
      current,
      image,
      position: add(obj.position, animation.offset),
      localSize: mult(animation.size, animation.scale),
    },
  };
};
