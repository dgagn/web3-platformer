import {createSound, pauseSound, playSound} from '../core/sound';
import {soundMusic} from '../sounds/music';

export const audio = createSound(soundMusic);

export function startMusic() {
  playSound(audio);
}

export function pauseMusic() {
  pauseSound(audio);
}
