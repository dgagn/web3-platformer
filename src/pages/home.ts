import {createHero} from '../components/hero';
import {createLeaderboard} from '../components/leaderboard';
import {getLeaderboard} from '../other/leaderboard';

export function createHomePage() {
  const list = getLeaderboard();
  const heroElement = createHero();
  const leaderboardElement = createLeaderboard(list);

  return heroElement.add(leaderboardElement);
}
