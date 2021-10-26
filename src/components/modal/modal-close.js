import {emitterHome} from '../../entities/emitter';
import $ from 'jquery';
import {setHomePage} from '../../pages/home';

/**
 * Listen to `modalclose` event to apply the actions
 * when a modal closes.
 *
 */
export function eventModalClose() {
  emitterHome.on('modalclose', () => {
    $('#modal').remove();
    if ($('#game').length > 0) {
      setHomePage();
    }
  });
}
