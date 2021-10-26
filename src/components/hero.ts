import $ from 'jquery';

/**
 * Creates the default hero for the home page.
 * The hero section contains the button to play
 * the game.
 *
 * @return {JQuery<HTMLElement>} - returns a section jquery
 * element
 */
export function createHero() {
  return $(`
<section class="hero max-w-xl container grid">
  <div class="hero__titre fade">
    <h1 class="text-4xl mt-xl@sm mt-md">Collecteur</h1>
    <p class="mt-md mb-lg">
      Bienvenue sur le jeu Collecteur. Le but du jeu est de collecter le
      plus de jetons possible en
      <mark>90 secondes</mark>. Ce jeu a été créé pour le TP1 dans mon cours
      de Web 3. Bouger la souris pour voir un effet parallaxe. Créer par
      Dany Gagnon.
    </p>
    <button class="link-fx-4 px-md pointer mb-lg" id="play">Jouer une partie</button>
  </div>
  <div class="hero__image parallax anim" role="img" id="hero">
    <div class="curtain parallax"></div>
    <div class="bars parallax"></div>
    <div class="player parallax"></div>
  </div>
</section>`);
}
