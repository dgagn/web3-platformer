import {add, mult} from './vector';
import {hasState} from './state';
import {createImage} from './image';

export function createAnimations(states) {
  return obj => {
    if (!hasState(obj))
      throw new Error('Objects is missing the state property');

    const allStates = states.map(s => {
      const image = createImage(s.src);
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
}

export function unsafeUpdateAnimation(frames) {
  return obj => {
    const filteredAnimation =
      obj.animations.filter(s => s.state === obj.state)[0] ?? {};

    if (frames % filteredAnimation.steps === 0) {
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
}

export function drawSprite(context, obj) {
  context.drawImage(
    obj.animation.image,
    obj.current * obj.animation.size[0],
    obj.animation.yoffset ?? 0,
    obj.animation.size[0],
    obj.animation.size[1],
    obj.animation.position[0],
    obj.animation.position[1],
    obj.animation.localSize[0],
    obj.animation.localSize[1]
  );
}
