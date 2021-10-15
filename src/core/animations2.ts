import {add, mult} from './vector';
import {round} from '../utils';

export const createAnimations2 = (states: any[]) => obj => {
  // todo: checks for state

  const animation = states.filter(s => s.state === obj.state)[0] ?? {};
  const image = new Image();
  image.src = animation.src;

  const allStates = states.map(s => {
    const image = new Image();
    image.src = s.src;
    return {
      ...s,
      image,
      localSize: mult(s.size, s.scale),
      newOffset: mult(s.offset, s.scale),
    };
  });

  return {
    ...obj,
    current: 0,
    animations: allStates,
  };
};

export const unsafeUpdateAnimation = frames => obj => {
  // todo: checks for animations properties
  const filteredAnimation =
    obj.animations.filter(s => s.state === obj.state)[0] ?? {};

  if (round(frames, 0) % filteredAnimation.steps === 0) {
    obj.current =
      obj.current < filteredAnimation.steps - 1 ? obj.current + 1 : 0;
  }

  return {
    ...obj,
    animation: {
      ...filteredAnimation,
      position: add(obj.position, filteredAnimation.newOffset),
    },
  };
};
