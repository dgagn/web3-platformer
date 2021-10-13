import {isDefined} from 'utils';

describe('lang functions', () => {
  it('should detect if something is defined or not', () => {
    expect(isDefined(undefined)).toBeFalsy();
  });
  it('should detect if it is defined', () => {
    expect(isDefined(true)).toBeTruthy();
  });
});
