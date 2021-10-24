import {pipeWith} from '../utils';
import {size} from '../core';
import {state} from '../core/state';
import {
  createAnimations,
  drawSprite,
  unsafeUpdateAnimation,
} from '../core/animation';
import {spriteUi} from '../sprites/ui';
import {update} from '../core/engine';
import {position} from '../core/physics';
import {score} from '../other/score';
import {time} from '../other/time';

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

export function drawUi({context, entities: {timerUi, coinUi, player}}) {
  context.globalAlpha = 1;
  drawSprite(context, timerUi);
  drawSprite(context, coinUi);

  context.fillStyle = '#676670';
  context.font = '24px system-ui';
  context.fillText(`${time}`, 88, 68);
  context.fillText(`${score}`, 88, 120);

  console.log(player.name);
}

export function drawGameOverUi({context, canvas}) {
  context.globalAlpha = 0.8;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#fff';
  context.fillText('Game Over', canvas.width / 2.4, canvas.height / 2);
  context.fillText(
    `Avec un score de ${score}`,
    canvas.width / 2.8,
    canvas.height / 1.7
  );
}
