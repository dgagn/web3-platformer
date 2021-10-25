import {emitterHome} from '../../entities/emitter';
import {createModal} from './modal';
import {app} from '../app';
import {eventCloseButton, eventStartButton} from '../btn';

export function eventModalOpen() {
  emitterHome.on(
    'modalopen',
    ({name = '', title = '', subtitle = '', button = '', emoji = ''} = {}) => {
      const modal = createModal(name, title, subtitle, button, emoji);
      app.append(modal);
      eventCloseButton();
      eventStartButton();
    }
  );
}
