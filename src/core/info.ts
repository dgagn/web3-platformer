export function getPlayer() {
  return localStorage.getItem('player') ?? '';
}

export function player() {
  return {
    info: getPlayer(),
  };
}
