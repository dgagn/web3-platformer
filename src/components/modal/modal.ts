import $ from 'jquery';

import {eventModalClose} from './modal-close';
import {eventModalOpen} from './modal-open';
import {eventModalStart} from './modal-start';
import {eventModalError} from './modal-error';

/**
 * Creates a modal component with properties.
 *
 * @param {string=} name - the name of the player
 * @param {string=} title - the title of the modal
 * @param {string=} subtitle - the subtitle of the modal
 * @param {string=} button - the button text of the confirmation
 * @param {string=} emoji - the title emoji
 * @param {string=} info - the score of the player
 * @return {JQuery<HTMLDivElement>} - returns a jquery element
 * of a modal
 */
export function createModal(name, title, subtitle, button, emoji, info) {
  return $(`
  <div class="modal z-max" id="modal">
  <div class="content rounded relative p-sm@!sm">
    <h3 class="mt-sm text-center">
      <span role="img" aria-label="emoji"> ${emoji} </span>
      ${title}
    </h3>
    <p class="text-md text-center text-contrast-500 mt-sm font-bold">${info}</p>
    <p class="mt-sm text-center">${subtitle}</p>
    <span class="block mt-lg">
      <label for="nom" class="form__label"> Votre nom </label>
      <input type="text" id="nom" class="form__control" value="${name}" />
      <p class="text-sm text-contrast-500 mt-xs">
        Un maximum de 20 caractères
      </p>
      <p class="text-sm text-error-500 mt-xs" id="error"></p>
    </span>
    <div
      class="
        flex
        mt-md
        mb-sm
        align-center
        justify-center
        flex-wrap
        gap-y-md
      "
    >
      <button
        class="button-reset text-bg-fx text-bg-fx&#45;&#45;scale-y mr-lg"
        id="close"
      >
        Annuler
      </button>
      <button
        class="
          button-reset
          text-bg-fx text-bg-fx&#45;&#45;scale-y
          button-bg
          px-md
          py-sm
          rounded
          h-50
        "
        id="start"
      >
        ${button}
      </button>
    </div>
  </div>
</div>
`);
}

/**
 * Generates all the events for the modal component.
 *
 */
export function eventModal() {
  eventModalOpen();
  eventModalClose();
  eventModalStart();
  eventModalError();
}
