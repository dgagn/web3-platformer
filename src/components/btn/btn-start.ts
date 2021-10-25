import $ from 'jquery';
import {emitterHome} from '../../entities/emitter';

export function eventStartButton() {
  const startElement = $('#start');
  startElement.on('click', () => {
    emitterHome.emit('modalstart');
  });
}
