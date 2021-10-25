import {curry, isDefined} from '../utils';

export function hasState(obj) {
  return isDefined(obj.state);
}

const _state = (key, boolean, obj) => ({
  ...obj,
  state: boolean ? key : hasState(obj) ? obj.state : 'stateless',
});

export const state = curry(_state);
