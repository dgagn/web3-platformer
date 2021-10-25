import {emitterHome} from '../entities/emitter';
import {app} from './app';
import $ from 'jquery';
import {eventCloseButton, eventStartButton} from './btn';
import {createGamePage, setGamePage} from '../pages/game';
import {setPlayer} from '../core/info';
import {createHomePage, setHomePage} from '../pages/home';

export function createModal(name, title) {
  return $(`
  <div class='modal z-max' id='modal'>
  <div class='content rounded relative p-sm@!sm'>
    <h3 class='mt-sm'>
      <span role='img' aria-label='emoji pour un étoile'> ⭐ </span>
      ${title}
    </h3>
    <p class='mt-sm'>Essayer de battre votre top-score de Collecteur.</p>
    <span class='block mt-lg'>
      <label for='nom' class='form__label'> Votre nom </label>
      <input type='text' id='nom' class='form__control' value='${name}' />
      <p class='text-sm text-contrast-500 mt-xs'>
        Un maximum de 20 caractères
      </p>
      <p class='text-sm text-error-500 mt-xs' id='error'></p>
    </span>
    <div
      class='
        flex
        mt-md
        mb-sm
        align-center
        justify-center
        flex-wrap
        gap-y-md
      '
    >
      <button
        class='button-reset text-bg-fx text-bg-fx&#45;&#45;scale-y mr-lg'
        id='close'
      >
        Annuler
      </button>
      <button
        class='
          button-reset
          text-bg-fx text-bg-fx&#45;&#45;scale-y
          button-bg
          px-md
          py-sm
          rounded
          h-50
        '
        id='start'
      >
        Commencer
      </button>
    </div>
  </div>
</div>
`);
}

export function eventModal() {
  emitterHome.on('modalopen', ({name = '', title = ''} = {}) => {
    const modal = createModal(name, title);
    app.append(modal);
    eventCloseButton();
    eventStartButton();
  });
  emitterHome.on('modalclose', () => {
    $('#modal').remove();
    if ($('#game').length > 0) {
      setHomePage();
    }
  });
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
  emitterHome.on('modalerror', text => {
    const errorElement = $('#error');
    errorElement.text(text);
  });
}
