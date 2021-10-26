import {isDefined} from '../utils';

/**
 * @typedef {Object} Emitter
 * @property {Function} on - listens to a event
 * @property {Function} off - remove the listener from a
 * event
 * @property {Function} emit - emits a event to all the
 * listeners `on`.
 */

/**
 * Creates a emitter that can emit, listen and close
 * events. (on, off, emit)
 *
 * @category core
 * @param {Map=} events - a optional default map
 * @return {Emitter} - a object with the emitter properties
 */
export function emitter(events = new Map()) {
  return {
    events,
    on(key, handler) {
      const handlers = events.get(key);
      isDefined(handlers) ? handlers.push(handler) : events.set(key, [handler]);
    },
    off(key, handler = undefined) {
      const handlers = events.get(key);
      handlers && handler
        ? handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        : events.set(key, []);
    },
    emit(key, evt = undefined) {
      const handlers = events.get(key);
      if (isDefined(handlers)) handlers.slice().map(h => h(evt));
    },
    clear() {
      events.clear();
    },
  };
}
