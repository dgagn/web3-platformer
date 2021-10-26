import {emitterHome} from '../../entities/emitter';
import $ from 'jquery';

/**
 * Listens to the `modalerror` event and sets the
 * message to the error element in the dom on the
 * modal.
 */
export function eventModalError() {
  emitterHome.on('modalerror', text => {
    const errorElement = $('#error');
    errorElement.text(text);
  });
}
