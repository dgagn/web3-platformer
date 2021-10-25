import {score} from './score';

export function getLeaderboard() {
  return JSON.parse(localStorage.getItem('leaderboard')) ?? [];
}

export function setLeaderboard(leaderboard) {
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

export function isHighScore(leaderboard, player) {
  const p = leaderboard.filter(l => l.name === player.info)[0]?.score ?? -1;
  return (
    score > p &&
    (leaderboard.some(l => score > l.score) || leaderboard.length != 10)
  );
}

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
