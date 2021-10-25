import {emitterHome} from '../entities/emitter';

export function modal() {}

export function eventModalOpen() {
  emitterHome.on('modalopen', () => {});
}
