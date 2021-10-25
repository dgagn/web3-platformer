import {isDefined} from '../utils';

export function hasRectangle(obj) {
  return [
    obj.top,
    obj.bottom,
    obj.left,
    obj.right,
    obj.oldtop,
    obj.oldbottom,
    obj.oldleft,
    obj.oldright,
  ].every(isDefined);
}

export function rectangle(obj) {
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
}
