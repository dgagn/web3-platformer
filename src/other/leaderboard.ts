import {score} from './score';

function getLeaderboard() {
  return JSON.parse(localStorage.getItem('leaderboard')) ?? [];
}

function setLeaderboard(leaderboard) {
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

export function eventLeaderboard(game) {
  const maxLeaderboardSize = 10;
  const {
    entities: {player},
  } = game;
  const leaderboard = getLeaderboard();
  if (!leaderboard) setLeaderboard([]);

  const p = leaderboard.filter(l => l.name === player.info)[0]?.score ?? -1;
  const isHighScore =
    score > p &&
    (leaderboard.some(l => score > l.score) ||
      leaderboard.length != maxLeaderboardSize);

  if (!isHighScore) return;

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
}
