import {createNoScore, createScore} from './score';
import $ from 'jquery';

export function createLeaderboard(list) {
  return $(`
<section class='clip bg-contrast-900'>
  <h2 class='text-contrast-50 pt-xl text-center mb-xs'>Classement</h2>
  <p class='text-contrast-300 text-center mb-2xl'>
    Le classement des 10 meilleurs performances pour le jeu de Collecteur
  </p>
  ${
    list.length === 0
      ? createNoScore()
      : list.map(createScore).reduce((a, b) => a + b)
  }
</section>
  `);
}
