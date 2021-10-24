export function playerName(obj) {
  const player = JSON.parse(localStorage.getItem('player-name'));
  return {
    ...obj,
    name: player,
  };
}
