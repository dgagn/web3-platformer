import {Vec} from './vector';
import {Vector} from './';

export const hasSize = (obj) => !!obj.size;

export const sizer =
  ([width, height]: Vec = Vector.zero) =>
    (obj) => {
      if ((width === null || height === null) && !hasSize(obj)) {
        throw new Error('the object must have a size property when calling null');
      }

      const updateWidth = width === null ? obj.size[0] : width; // ?
      const updateHeight = height === null ? obj.size[1] : height; // ?

      return {
        ...obj,
        size: [updateWidth, updateHeight],
      };
    };
