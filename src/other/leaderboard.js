import {score} from './score';

/**
 * Gets the leaderboard in the local storage.
 * @return {Leaderboard[]}
 */
export function getLeaderboard() {
  return JSON.parse(localStorage.getItem('leaderboard')) ?? [];
}

/**
 * Sets the leaderboard in the local storage.
 * @param {Leaderboard} leaderboard - the leaderboard to set to the
 * local storage
 */
export function setLeaderboard(leaderboard) {
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

/**
 * Checks if the score is a high score.
 *
 * @param {Leaderboard[]} leaderboard - the leaderboard
 * @param {Object} player - the player entity
 * @return {boolean} - if the score is a high
 * score or not
 */
export function isHighScore(leaderboard, player) {
  const p = leaderboard.filter(l => l.name === player.info)[0]?.score ?? -1;
  return (
    score > p &&
    (leaderboard.some(l => score > l.score) || leaderboard.length != 10)
  );
}

/**
 * Checks the leaderboard when the game is over.
 * @param {Object} game - the game object
 * @return {boolean} - if the score is a high
 * score
 */
export function eventLeaderboard(game) {
  const maxLeaderboardSize = 10;

  const {
    entities: {player},
  } = game;
  const leaderboard = getLeaderboard();
  if (!leaderboard) setLeaderboard([]);

  const isHigh = isHighScore(leaderboard, player);

  if (!isHigh) return false;

  const updateScore = {
    name: player.info,
    score,
  };
  const newLeaderboard = [
    ...leaderboard.filter(l => l.name !== player.info),
    updateScore,
  ]
    .sort((a, b) => a.score - b.score)
    .reverse()
    .slice(0, maxLeaderboardSize);

  setLeaderboard(newLeaderboard);
  return true;
}
