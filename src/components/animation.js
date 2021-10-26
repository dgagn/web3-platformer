import $ from 'jquery';

/**
 * jQuery fade animation to a selector.
 *
 * @param {string} selector - the selector to fade
 * @return {jQuery} - a jquery element of the selector
 */
export function fade(selector) {
  const $fade = $(selector);
  $fade.css({display: 'none'});
  $fade.fadeIn();
  return $fade;
}

/**
 * jQuery left animation to animate a selector from
 * a left position.
 *
 * @param {string} selector - the selector to animate
 * @return {jQuery} - a jquery element of the selector
 */
export function leftAnimation(selector) {
  const $anim = $(selector);
  $anim.css({left: '300px'});
  $anim.animate({
    left: '0',
  });
  return $anim;
}
