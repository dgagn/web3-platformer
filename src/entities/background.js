import {mult} from '../core/vector';
import {createImage} from '../core/image';
import {spriteBackgrounds} from '../sprites/background';

/**
 * Creates the background.
 *
 * @param {Object[]} backgrounds - the backgrounds images
 * @return {Object} - the background objects
 */
export function createBackgrounds(backgrounds) {
  return backgrounds.map(background => ({
    ...background,
    image: createImage(background.src),
    localSize: mult(background.size, background.scale),
  }));
}

/**
 * The backgrounds with the `spriteBackgrounds`
 */
const backgrounds = createBackgrounds(spriteBackgrounds);

/**
 * Draws all the backgrounds on a context in a parallax
 * motion.
 * @param {CanvasRenderingContext2D} context - the canvas context
 * @param {Object} player - the player entity
 */
export function drawBackground({context, entities: {player}}) {
  context.globalAlpha = 0.3;

  backgrounds.forEach(background => {
    context.drawImage(
      background.image,
      player.position[0] / 40,
      0,
      background.size[0],
      background.size[1],
      background.position[0],
      background.position[1],
      background.localSize[0],
      background.localSize[1]
    );
  });

  context.globalAlpha = 1;
}
