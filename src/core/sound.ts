export const sounds = [
  {
    name: 'music',
    src: 'music.ogg',
    volume: 0.5,
    loop: true,
  },
];

export const coinSound = [
  {
    name: 'coin',
    src: 'coin/collectible.wav',
    volume: 0.8,
  },
];

export const createSound = sounds => obj => {
  const withSounds = sounds.map(sound => {
    const audio = new Audio(sound.src);
    audio.volume = sound.volume ?? 0;
    audio.loop = sound.loop ?? false;
    return {
      ...sound,
      audio,
    };
  });
  return {
    ...obj,
    sounds: withSounds,
  };
};

export const playSoundOnState = state => obj => {
  const sound = obj.sounds.filter(
    sound => sound.state === state && obj.state === state
  )[0];
  sound?.audio?.play().catch(e => {});
  return obj;
};
