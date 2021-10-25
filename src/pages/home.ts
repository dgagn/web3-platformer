import {createHero} from '../components/hero';
import {createLeaderboard} from '../components/leaderboard';
import {getLeaderboard} from '../other/leaderboard';
import {eventPlayButton} from '../components/btn';
import {parallax} from '../components/parallax';
import {app} from '../components/app';
import {fade, leftAnimation} from '../components/animation';
import {backtop, createBacktop} from '../components/backtop';

export function createHomePage() {
  const list = getLeaderboard();
  const heroElement = createHero();
  const leaderboardElement = createLeaderboard(list);
  const backtop = createBacktop();

  return heroElement.add(leaderboardElement).add(backtop);
}

export function setHomePage() {
  const homePage: any = createHomePage();
  app.html(homePage);
  eventPlayButton();
  parallax();
  fade('.fade');
  leftAnimation('.anim');
  backtop('.back-top');
}
