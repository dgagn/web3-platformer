import {emitterHome} from '../../entities/emitter';
import $ from 'jquery';

export function eventModalError() {
  emitterHome.on('modalerror', text => {
    const errorElement = $('#error');
    errorElement.text(text);
  });
}
