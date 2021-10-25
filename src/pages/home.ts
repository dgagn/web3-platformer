import {createHero} from '../components/hero';
import {createLeaderboard} from '../components/leaderboard';
import {getLeaderboard} from '../other/leaderboard';
import {eventPlayButton} from '../components/btn';
import {eventModal} from '../components/modal';
import {parallax} from '../components/parallax';
import {app} from '../components/app';

export function createHomePage() {
  const list = getLeaderboard();
  const heroElement = createHero();
  const leaderboardElement = createLeaderboard(list);

  return heroElement.add(leaderboardElement);
}

export function setHomePage() {
  const homePage: any = createHomePage();
  app.html(homePage);
  eventPlayButton();
  parallax();
}
