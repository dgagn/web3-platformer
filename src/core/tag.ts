export const tag = (name: string) => obj => {
  return {
    ...obj,
    tag: name,
  };
};
