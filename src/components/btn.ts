import $ from 'jquery';
import {emitterHome} from '../entities/emitter';

export function eventPlayButton() {
  const playElement = $('#play');
  playElement.on('click', () => {
    emitterHome.emit('modalopen');
  });
}
