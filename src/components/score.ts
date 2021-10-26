/**
 * Creates the score component used inside the
 * `createLeaderboard` component.
 *
 * @param {Leaderboard} player - the player in the leaderboard
 * @param {number} index - the index of the player on
 * the leaderboard
 * @return {string} - the score component in a string
 * format.
 */
export function createScore(player, index) {
  return `
<div class="pill bg-contrast-800 max-w-sm container relative mb-md">
  <div class="number absolute left-md text-primary-800">
    ${index + 1}
  </div>
  <div class="player-icon"></div>
  <div class="player-name text-contrast-200">${player.name}</div>
  <div class="player-score text-primary-500 font-bold">${player.score}</div>
</div>
`;
}

/**
 * Creates the no score component if the `leaderboard`'s
 * list is empty.
 *
 * @return {string} - the no score component if the
 * `leaderboard` is empty
 */
export function createNoScore() {
  return `
<p class="text-contrast-500 text-center">
  Désolé Aucune partie joué pour l'instant 😞
</p>
`;
}
