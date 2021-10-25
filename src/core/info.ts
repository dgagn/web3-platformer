export function getPlayer() {
  return localStorage.getItem('player') ?? '';
}

export function setPlayer(name) {
  localStorage.setItem('player', name);
}

export function player() {
  return {
    info: getPlayer(),
  };
}
