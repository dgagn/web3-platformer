import {emitterHome} from '../../entities/emitter';
import $ from 'jquery';
import {setHomePage} from '../../pages/home';

export function eventModalClose() {
  emitterHome.on('modalclose', () => {
    $('#modal').remove();
    if ($('#game').length > 0) {
      setHomePage();
    }
  });
}
