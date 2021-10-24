function getPlayer() {
  return JSON.parse(localStorage.getItem('player')) ?? {};
}

export function player() {
  return {
    player: getPlayer(),
  };
}
