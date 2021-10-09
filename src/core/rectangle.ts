import {TPhysics} from './physics';
import {vector} from './vector';
import {TSize} from './size';

export type TRectangle = TSize & TPhysics;

const rectangle = <T extends TRectangle>(rec: T): T => {
  const {width, height, position} = rec;
  const [px, py] = position;

  return {
    ...rec,
    center: vector(px + width / 2, py + height / 2),
  };
};

export default rectangle;
