const state = (state) => (boolean) => (p) => {
  return {
    ...p,
    state: boolean ? state : p.state,
  };
};

let frames = 0;
let current = 0;
export const createAnimations = (states: any[]) => (p) => {
  const animation = states.filter((s) => s.state === p.state)[0] ?? {};
  const image = new Image();
  image.src = animation.src;
  if (frames % animation.steps == 0) {
    current = current < animation.steps - 1 ? current + 1 : 0;
  }
  frames++;
  return {
    ...p,
    animation: {
      ...animation,
      current,
      image,
    },
  };
};
