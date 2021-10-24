import {pipeWith} from '../utils';
import {physics, size} from '../core';
import {state} from '../core/state';
import {createAnimations, unsafeUpdateAnimation} from '../core/animation';
import {uiSprite} from '../sprites/ui';
import {update} from '../core/engine';

export function createTimerUI() {
  return pipeWith(
    {},
    physics({position: [48, 48]}),
    size(24, 24),
    state('timer', true),
    createAnimations(uiSprite)
  );
}

export function createCoinUI() {
  return pipeWith(
    {},
    physics({position: [48, 100]}),
    size(24, 24),
    state('coin', true),
    createAnimations(uiSprite)
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
