import {pipeWith} from '../utils';
import {size} from '../core/size';
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

/**
 * Creates the timer ui.
 * @return {Object} - the timer ui
 */
export function createTimerUI() {
  return pipeWith(
    {},
    position([48, 48]),
    size(24, 24),
    state('timer', true),
    createAnimations(spriteUi)
  );
}

/**
 * Creates the coin ui.
 * @return {Object} - the coin ui
 */
export function createCoinUI() {
  return pipeWith(
    {},
    position([48, 100]),
    size(24, 24),
    state('coin', true),
    createAnimations(spriteUi)
  );
}

/**
 * Updates the UI every frames.
 *
 * @function
 * @type {Update}
 */
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

/**
 * Draws the UI every frames.
 *
 * @param {Object} game - the game object
 */
export function drawUi({context, canvas, entities: {timerUi, coinUi, player}}) {
  context.globalAlpha = 1;
  drawSprite(context, timerUi);
  drawSprite(context, coinUi);

  context.fillStyle = '#676670';
  context.font = '24px system-ui';
  context.fillText(`${time}`, 88, 68);
  context.fillText(`${score}`, 88, 120);
  context.fillText(`${player.info}`, canvas.width / 2 - 24, 30);
}
