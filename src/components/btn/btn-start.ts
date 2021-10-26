import $ from 'jquery';
import {emitterHome} from '../../entities/emitter';

/**
 * Triggers a event when the start button is clicked.
 *
 * **Note:** emits the `modalstart` event
 */
export function eventStartButton() {
  const startElement = $('#start');
  startElement.on('click', () => {
    emitterHome.emit('modalstart');
  });
}
