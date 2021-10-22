import {pipeWith} from '../utils';
import {physics, size} from '../core';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {uiSprite} from '../sprites/ui';
import {draw, update} from '../core/game';

let timerUi = pipeWith(
  {},
  physics({position: [48, 48]}),
  size(24, 24),
  state('timer', true),
  createAnimations(uiSprite)
);

let coinUi = pipeWith(
  {},
  physics({position: [48, 100]}),
  size(24, 24),
  state('coin', true),
  createAnimations(uiSprite)
);

update(frames => {
  timerUi = pipeWith(timerUi, unsafeUpdateAnimation(~~frames));
  coinUi = pipeWith(coinUi, unsafeUpdateAnimation(~~frames));
});

draw(context => {
  drawSprite(context, timerUi);
  drawSprite(context, coinUi);
});
