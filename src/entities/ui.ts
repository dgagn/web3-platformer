import {pipeWith} from '../utils';
import {size} from '../core';
import {state} from '../core/state';
import {createAnimations, unsafeUpdateAnimation} from '../core/animation';
import {spriteUi} from '../sprites/ui';
import {update} from '../core/engine';
import {position} from '../core/physics';

export function createTimerUI() {
  return pipeWith(
    {},
    position([48, 48]),
    size(24, 24),
    state('timer', true),
    createAnimations(spriteUi)
  );
}

export function createCoinUI() {
  return pipeWith(
    {},
    position([48, 100]),
    size(24, 24),
    state('coin', true),
    createAnimations(spriteUi)
  );
}

export const updateUi = update(({game, frames}) => {
  game.entities.timerUi = pipeWith(
    game.entities.timerUi,
    unsafeUpdateAnimation(~~frames)
  );
  game.entities.coinUi = pipeWith(
    game.entities.coinUi,
    unsafeUpdateAnimation(~~frames)
  );
});
