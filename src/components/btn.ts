import $ from 'jquery';
import {emitterHome} from '../entities/emitter';
import {app} from './app';

export function eventPlayButton() {
  const playElement = $('#play');
  playElement.on('click', () => {
    emitterHome.emit('modalopen', {title: 'Commencer la partie'});
  });
}

export function eventCloseButton() {
  const closeElement = $('#close');
  closeElement.on('click', () => {
    emitterHome.emit('modalclose');
  });
}

export function eventStartButton() {
  const startElement = $('#start');
  startElement.on('click', () => {
    emitterHome.emit('modalstart');
  });
}
