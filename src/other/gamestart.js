import {createSound, pauseSound, playSound} from '../core/sound';
import {soundMusic} from '../sounds/music';

/**
 * The music that plays at the start.
 */
const audio = createSound(soundMusic);

/**
 * Start the music that plays at the start.
 */
export function startMusic() {
  playSound(audio);
}

/**
 * Stops the music.
 */
export function pauseMusic() {
  pauseSound(audio);
}
