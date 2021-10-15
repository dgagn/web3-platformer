import {isDefined} from '../utils';

export function emitter(events = new Map()) {
  return {
    events,
    on(key, handler) {
      const handlers = events.get(key);
      isDefined(handlers) ? handlers.push(handler) : events.set(key, [handler]);
    },
    off(key, handler?) {
      const handlers = events.get(key);
      handlers && handler
        ? handlers.splice(handlers.indexOf(handler) >>> 0, 1)
        : events.set(key, []);
    },
    emit(key, evt?) {
      const handlers = events.get(key);
      if (isDefined(handlers)) handlers.slice().map(h => h(evt));
    },
  };
}
