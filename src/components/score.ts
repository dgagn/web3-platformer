export function createScore(player, index) {
  return `
<div class='pill bg-contrast-800 max-w-sm container relative mb-md'>
  <div class='number absolute left-md text-primary-800'>
    ${index + 1}
  </div>
  <div class='player-icon'></div>
  <div class='player-name text-contrast-200'>${player.name}</div>
  <div class='player-score text-primary-500 font-bold'>${player.score}</div>
</div>
`;
}

export function createNoScore() {
  return `
<p class='text-contrast-500 text-center'>
  Désolé Aucune partie joué pour l'instant 😞
</p>
`;
}
