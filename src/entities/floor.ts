import {game, update} from '../core/game';
import {pipeWith} from '../utils';
import {physics, rectangle, size, updatePhysics} from '../core';
import {tag} from '../core/tag';

export let floor = pipeWith(
  {},
  tag('floor'),
  physics({position: [0, game.canvas.height - 40]}),
  size(game.canvas.width, 20),
  rectangle
);

update(() => {
  floor = pipeWith(floor, updatePhysics(0.1), rectangle);
});
