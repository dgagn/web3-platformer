import {emitterHome} from '../../entities/emitter';
import {createModal} from './modal';
import {app} from '../app';
import {eventCloseButton, eventStartButton} from '../btn';
import $ from 'jquery';

/**
 * Listens to the `modalopen` event on the modal to
 * make sure the modal opens when needed.
 */
export function eventModalOpen() {
  emitterHome.on(
    'modalopen',
    ({
      name = '',
      title = '',
      subtitle = '',
      button = '',
      emoji = '',
      info = '',
    } = {}) => {
      const modal = createModal(name, title, subtitle, button, emoji, info);
      if ($('#modal').length > 0) return;
      app.append(modal.hide().fadeIn(200));
      eventCloseButton();
      eventStartButton();
    }
  );
}
