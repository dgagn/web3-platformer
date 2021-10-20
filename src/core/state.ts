import {curry, isDefined} from '../utils';

export const hasState = obj => isDefined(obj.state);

const _state = (key, boolean, obj) => ({
  ...obj,
  state: boolean ? key : hasState(obj) ? obj.state : 'stateless',
});

export const state = curry(_state);
