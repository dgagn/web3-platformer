import $ from 'jquery';
import {emitterHome} from '../../entities/emitter';

export function eventCloseButton() {
  const closeElement = $('#close');
  closeElement.on('click', () => {
    emitterHome.emit('modalclose');
  });
}
