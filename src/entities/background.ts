import {mult} from '../core/vector';
import {createImage} from '../core/image';
import {spriteBackgrounds} from '../sprites/background';

export function createBackgrounds(backgrounds) {
  return backgrounds.map(background => ({
    ...background,
    image: createImage(background.src),
    localSize: mult(background.size, background.scale),
  }));
}

const backgrounds = createBackgrounds(spriteBackgrounds);

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
