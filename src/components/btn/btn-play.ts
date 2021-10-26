import $ from 'jquery';
import {emitterHome} from '../../entities/emitter';

/**
 * Triggers a event when the play button is clicked.
 *
 * **Note:** emits the `modalopen` event
 */
export function eventPlayButton() {
  const playElement = $('#play');
  playElement.on('click', () => {
    emitterHome.emit('modalopen', {
      title: 'Commencer la partie',
      subtitle: 'Essayer de battre votre top-score de Collecteur.',
      button: 'Commencer',
      emoji: '⭐',
    });
  });
}
