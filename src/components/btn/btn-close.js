import $ from 'jquery';
import {emitterHome} from '../../entities/emitter';

/**
 * Triggers a event when the close button is clicked.
 *
 * **Note:** emits the `modalclose` event
 */
export function eventCloseButton() {
  const closeElement = $('#close');
  closeElement.on('click', e => {
    e.preventDefault();
    emitterHome.emit('modalclose');
  });
}
