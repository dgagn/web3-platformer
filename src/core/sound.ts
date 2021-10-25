export function createSound(sound) {
  const audio = new Audio(sound.src);
  audio.volume = sound.volume ?? 0;
  audio.loop = sound.loop ?? false;
  return {
    ...sound,
    audio,
  };
}

export function createSounds(sounds) {
  return obj => {
    const withSounds = sounds.map(createSound);
    return {
      ...obj,
      sounds: withSounds,
    };
  };
}

export function playSoundOnState(state) {
  return obj => {
    const sound = obj.sounds.filter(
      sound => sound.state === state && obj.state === state
    )[0];
    playSound(sound);
    return obj;
  };
}

export function playSound(sound) {
  sound?.audio.play().catch(_ => {});
}

export function pauseSound(sound) {
  sound?.audio.pause();
}
