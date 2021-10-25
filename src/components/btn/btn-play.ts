import $ from 'jquery';
import {emitterHome} from '../../entities/emitter';

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
