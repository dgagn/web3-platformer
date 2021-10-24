import {isDefined} from '../utils';

export const hasRectangle = obj =>
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

export const rectangle = obj => {
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
