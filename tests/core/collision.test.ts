import {
  collision,
  hasCollision,
  isBottomTopCollision,
  isLeftRightCollision,
  isRightLeftCollision,
  isTopBottomCollision,
} from '../../src/core/collision';
import {pipeWith} from '../../src/utils';
import {physics, rectangle, size} from '../../src/core';

const rec1 = pipeWith({}, physics({}), size(64, 64), rectangle);
const rec2 = pipeWith({}, physics({}), size(64, 64), rectangle);

describe('has collision', () => {
  it('should return if it has a collision', () => {
    expect(hasCollision(rec1, rec2)).toBeTruthy();
  });
  it('should not have a collision if rec1 is far away', () => {
    const newRec1 = pipeWith(
        {},
        physics({position: [100, 100]}),
        size(30, 30),
        rectangle,
    );
    expect(hasCollision(newRec1, rec2)).toBeFalsy();
  });
  it('should return if bottom top collision', () => {
    expect(isBottomTopCollision(rec1, rec2)).toBeFalsy();
  });
  it('should return if top bottom collision', () => {
    expect(isTopBottomCollision(rec1, rec2)).toBeFalsy();
  });
  it('should return if right left collision', () => {
    expect(isRightLeftCollision(rec1, rec2)).toBeFalsy();
  });
  it('should return if left right collision', () => {
    expect(isLeftRightCollision(rec1, rec2)).toBeFalsy();
  });
});

describe('resolve collisions', () => {
  it('should throw a error if the first argument is not a rectangle', () => {
    expect(() => collision(rec1)({})).toThrow('rectangle');
  });
  it('should throw a error if the second argument is not a rectangle', () => {
    expect(() => collision({})(rec1)).toThrow('rectangle');
  });
  it('should return a function', () => {
    expect(collision({})).toBeInstanceOf(Function);
  });
  it('should return the default object if no collision', () => {
    const newRec1 = pipeWith(
        {},
        physics({position: [100, 100]}),
        size(30, 30),
        rectangle,
    );
    const noCollision = collision(newRec1)(rec2); // ?
    expect(noCollision).toEqual(rec2);
  });
  it('should return the default object when collision is none of them', () => {
    const r1 = pipeWith(
        {},
        physics({
          position: [0, 0],
          oldpos: [0, 0],
        }),
        size(100, 100),
        rectangle,
    );
    const r2 = pipeWith(
        {},
        physics({
          position: [0, 10],
          oldpos: [0, 100],
        }),
        size(100, 100),
        rectangle,
    );
    const noValidCollision = collision(r1)(r2); // ?
    expect(noValidCollision).toEqual(r2);
  });

  it('should resolve bottom top collision', () => {
    // todo: check for of type jumper to add isgrounded
    const r1 = pipeWith(
        {},
        physics({
          position: [76.99097598085001, 530.8],
          oldpos: [76.98997331205557, 529.9],
          velocity: [0.001, 0.9],
        }),
        size(32, 50),
        rectangle,
    );
    const r2 = pipeWith(
        {},
        physics({
          position: [0, 580],
          oldpos: [0, 580],
          velocity: [1, 1],
        }),
        size(800, 20),
        rectangle,
    );

    const topBottom = collision(r2)(r1); // ?
    expect(isBottomTopCollision(r1, r2)).toBeTruthy();
    expect(topBottom).toEqual({
      ...r1,
      position: [76.99097598085001, 529.9],
      velocity: [0.001, 1],
      isGrounded: true,
    });
  });
  it('should return if top bottom collision', () => {
    const r1 = pipeWith(
        {},
        physics({
          position: [76.99097598085001, 530.8],
          oldpos: [76.98997331205557, 529.9],
          velocity: [0.001, 0.9],
        }),
        size(32, 50),
        rectangle,
    );
    const r2 = pipeWith(
        {},
        physics({
          position: [0, 580],
          oldpos: [0, 580],
          velocity: [1, 1],
        }),
        size(800, 20),
        rectangle,
    );

    const topBottom = collision(r1)(r2); // ?
    expect(isTopBottomCollision(r2, r1)).toBeTruthy();
    expect(topBottom).toEqual({
      ...r2,
      position: [0, 580.9],
      velocity: [1, 0.9],
    });
  });
  it('should resolve right left collision', () => {
    const rec1 = {
      mass: 1,
      position: [117, 429.99919032467926],
      velocity: [0, -1.799910036075505],
      acceleration: [0, -0.2],
      oldpos: [117, 431.7991003607548],
      width: 71,
      height: 15,
      top: 429.99919032467926,
      bottom: 444.99919032467926,
      left: 117,
      right: 188,
      oldtop: 431.7991003607548,
      oldbottom: 446.7991003607548,
      oldleft: 117,
      oldright: 188,
    };
    const rec2 = {
      mass: 1,
      position: [85.27455828329, 418.27212186999986],
      velocity: [3.0806046351900007, -7.596902430000004],
      acceleration: [0, 1],
      oldpos: [82.1939536481, 425.86902429999986],
      width: 32,
      height: 50,
      top: 418.27212186999986,
      bottom: 468.27212186999986,
      left: 85.27455828329,
      right: 117.27455828329,
      oldtop: 425.86902429999986,
      oldbottom: 475.86902429999986,
      oldleft: 82.1939536481,
      oldright: 114.1939536481,
    };
    expect(collision(rec1)(rec2)).toEqual({
      ...rec2,
      position: [84.9, 418.27212186999986],
      velocity: [0, -7.596902430000004],
    });
  });
  it('should resolve left right collision', () => {
    const rec1 = {
      mass: 1,
      position: [275, 484.800000000002],
      velocity: [0, -1.799999999999999],
      acceleration: [0, -0.2],
      oldpos: [275, 486.600000000002],
      width: 53,
      height: 12,
      top: 484.800000000002,
      bottom: 496.800000000002,
      left: 275,
      right: 328,
      oldtop: 486.600000000002,
      oldbottom: 498.600000000002,
      oldleft: 275,
      oldright: 328,
    };
    const rec2 = {
      mass: 1,
      position: [324.48134171671, 489.13875872934995],
      velocity: [-6.175704635190001, 7.529026807849998],
      acceleration: [-1, 1],
      oldpos: [330.6570463519, 481.60973192149993],
      width: 32,
      height: 50,
      top: 489.13875872934995,
      bottom: 539.13875872935,
      left: 324.48134171671,
      right: 356.48134171671,
      oldtop: 481.60973192149993,
      oldbottom: 531.6097319214999,
      oldleft: 330.6570463519,
      oldright: 362.6570463519,
    };
    expect(collision(rec1)(rec2)).toEqual({
      ...rec2,
      position: [328.1, 489.13875872934995],
      velocity: [0, 7.529026807849998],
    });
  });
});
