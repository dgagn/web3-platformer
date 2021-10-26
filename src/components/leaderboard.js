import {createNoScore, createScore} from './score';
import $ from 'jquery';

/**
 * @typedef {Object} Leaderboard
 * @property {string} name - the name of the player
 * @property {number} score - the score of the player
 */

/**
 * Creates the leaderboard component with a list of
 * `createScore` if their is players or `createNoScore` if
 * no scores have been registered to the leaderboard.
 *
 * @param {Leaderboard[]} list - the leaderboard list
 * @return {JQuery<HTMLElement>} - jquery element of the
 * leaderboard component.
 */
export function createLeaderboard(list) {
  return $(`
<section class="clip bg-contrast-900">
  <h2 class="text-contrast-50 pt-xl text-center mb-xs">Classement</h2>
  <p class="text-contrast-300 text-center mb-2xl">
    Le classement des ${
      list.length
    } meilleurs performances pour le jeu de Collecteur
  </p>
  ${
    list.length === 0
      ? createNoScore()
      : list.map(createScore).reduce((a, b) => a + b)
  }
</section>
`);
}
