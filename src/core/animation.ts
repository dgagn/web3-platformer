import {add, draw, mult, vector} from './vector';
import {hasState} from './state';

export const createAnimations = states => obj => {
  if (!hasState(obj)) throw new Error('Objects is missing the state property');

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

const drawDebug = (context, obj) => {
  context.strokeRect(obj.position[0], obj.position[1], obj.width, obj.height);
  draw(context)(obj.velocity)(
    vector(obj.position[0] + obj.width / 2, obj.position[1] + obj.height / 2),
    10,
    'red'
  );
};
export const drawSprite = (context, obj) => {
  drawDebug(context, obj);
  context.drawImage(
    obj.animation?.image,
    obj.current * obj.animation.size[0],
    obj.animation.yoffset ?? 0,
    obj.animation.size[0],
    obj.animation.size[1],
    obj.animation.position[0],
    obj.animation.position[1],
    obj.animation.localSize[0],
    obj.animation.localSize[1]
  );
};
