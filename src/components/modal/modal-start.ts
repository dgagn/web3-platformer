import {emitterHome} from '../../entities/emitter';
import $ from 'jquery';
import {setGamePage} from '../../pages/game';

export function eventModalStart() {
  emitterHome.on('modalstart', () => {
    const input = $('#nom');
    const inputValue = input.val();
    const invalidValue = `${inputValue}`.trim() === '';

    if (invalidValue) {
      emitterHome.emit('modalerror', 'Le nom ne peut pas être vide');
      return;
    }

    emitterHome.emit('modalclose');
    setGamePage(inputValue);
  });
}
