// todo: add sound typedef

/**
 * Creates a sound with a new audio.
 *
 * @param {Sound} sound
 * @return {Object} - with the sounds property
 */
export function createSound(sound) {
  const audio = new Audio(sound.src);
  audio.volume = sound.volume ?? 0;
  audio.loop = sound.loop ?? false;
  return {
    ...sound,
    audio,
  };
}

/**
 * Adds the sounds to a entity.
 * @param {Sound[]} sounds - the sounds on the entity
 * @return {EntityCB} - the entity callback with the
 * sounds properties
 */
export function createSounds(sounds) {
  return obj => {
    const withSounds = sounds.map(createSound);
    return {
      ...obj,
      sounds: withSounds,
    };
  };
}

/**
 * Plays a certain sound on a entity state.
 *
 * @param {string} state - the state of the entity
 * @return {EntityCB} - a entity callback with the
 * default entity. *Nothing changed*
 */
export function playSoundOnState(state) {
  return obj => {
    const sound = obj.sounds.filter(
      sound => sound.state === state && obj.state === state
    )[0];
    playSound(sound);
    return obj;
  };
}

/**
 * Plays a sound.
 * @param {Sound} sound - the sound object with
 * a audio
 */
export function playSound(sound) {
  sound?.audio.play().catch(_ => {});
}

/**
 * Pauses a sound.
 * @param {Sound} sound - the sound object with
 * a audio
 */
export function pauseSound(sound) {
  sound?.audio.pause();
}
