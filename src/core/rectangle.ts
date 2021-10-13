import {hasSize, hasPhysics} from './index';
import {isDefined} from '../utils';

export const hasRectangle = (obj) =>
  [
    obj.top,
    obj.bottom,
    obj.left,
    obj.right,
    obj.oldtop,
    obj.oldbottom,
    obj.oldleft,
    obj.oldright,
  ].every(isDefined);

const rectangle = (obj) => {
  if (!hasPhysics(obj) || !hasSize(obj)) {
    throw new Error('the object must have physics and size properties');
  }

  const [px, py] = obj.position;
  const [ox, oy] = obj.oldpos;
  const {width, height} = obj;

  return {
    ...obj,
    top: py,
    bottom: py + height,
    left: px,
    right: px + width,
    oldtop: oy,
    oldbottom: oy + height,
    oldleft: ox,
    oldright: ox + width,
  };
};

export {rectangle};
