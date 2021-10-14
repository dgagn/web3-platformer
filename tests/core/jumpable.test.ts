import {pipeWith} from 'utils';
import {physics, size, hasJumpable, jump, jumpable} from 'core';

describe('jumpable', () => {
  it('should say if a object is a jumpable object', () => {
    expect(hasJumpable({})).toBeFalsy();
    expect(
      hasJumpable({
        isGrounded: true,
        jumpForce: 4,
      })
    ).toBeTruthy();
  });
  it('should return true even if falsy values', () => {
    expect(
      hasJumpable({
        isGrounded: false,
        jumpForce: 0,
      })
    ).toBeTruthy();
  });
  it('should create a jumpable object', () => {
    const jumper = jumpable(10);
    expect(jumper).toBeInstanceOf(Function);
    expect(jumper({})).toEqual({
      isGrounded: false,
      jumpForce: 10,
    });
  });
  it('should not overwrite default properties on object', () => {
    const jumper = jumpable(3);
    const a = {
      hello: true,
    };
    expect(jumper(a)).toEqual({
      hello: true,
      isGrounded: false,
      jumpForce: 3,
    });
  });
});

describe('jump', () => {
  it('should throw a error if the object is not valid', () => {
    expect(() => jump(0)({})).toThrow('jumpable');
    expect(() => jump(0)({isGrounded: false, jumpForce: 3})).toThrow('physics');
  });
  it('should return the current object if object is grounded', () => {
    const a = pipeWith({}, physics(), size(64, 64), jumpable(1));
    expect(jump(1)(a)).toEqual({
      ...a,
    });
  });
  it('should make the object jump if not grounded', () => {
    const a = pipeWith({}, physics(), size(64, 64), jumpable(1));
    const newA = {
      ...a,
      isGrounded: true,
    };
    expect(jump(1)(newA)).toEqual({
      ...newA,
      isGrounded: false,
      acceleration: [0, 1],
    });
  });
  it('should make the object jump axis y -1 and more force', () => {
    const a = pipeWith({}, physics(), size(64, 64), jumpable(10));
    const newA = {
      ...a,
      isGrounded: true,
    };
    expect(jump(-1)(newA)).toEqual({
      ...newA,
      isGrounded: false,
      acceleration: [0, -10],
    });
  });
});
