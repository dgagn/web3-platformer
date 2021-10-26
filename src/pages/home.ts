import {createHero} from '../components/hero';
import {createLeaderboard} from '../components/leaderboard';
import {getLeaderboard} from '../other/leaderboard';
import {eventPlayButton} from '../components/btn';
import {parallax} from '../components/parallax';
import {app} from '../components/app';
import {fade, leftAnimation} from '../components/animation';
import {backtop, createBacktop} from '../components/backtop';

/**
 * Creates the home page with all the components.
 *
 * @return {JQuery<HTMLElement>} - the home page component
 */
export function createHomePage() {
  const list = getLeaderboard();
  const heroElement = createHero();
  const leaderboardElement = createLeaderboard(list);
  const backtop = createBacktop();

  return heroElement.add(leaderboardElement).add(backtop);
}

/**
 * Sets the current page to the home page.
 */
export function setHomePage() {
  const homePage = createHomePage();
  // @ts-ignore
  app.html(homePage);

  eventPlayButton();
  parallax();
  fade('.fade');
  leftAnimation('.anim');
  backtop('.back-top');
}
