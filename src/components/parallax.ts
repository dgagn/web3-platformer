import $ from 'jquery';
import {vector} from '../core/vector';

const mouseParallax = selector => e => {
  const elem = $(selector);
  const width = innerWidth / 2;
  const height = innerWidth / 2;
  const [mx, my] = vector(e.clientX, e.clientY);
  const position = `${50 - (mx - width) * 0.01}% ${50 - (my - height) * 0.01}%`;
  elem.css({
    backgroundPosition: position,
  });
};

const scrollParallax = (varName, speed, limit = 330) => {
  if (window.scrollY * 0.3 >= limit) {
    return;
  }
  const $root = $(document.documentElement);
  const imageScroll = `${window.scrollY * speed}px`;
  $root.get(0).style.setProperty(varName, imageScroll);
};

/**
 * Creates a parallax component by modifying the
 * css variables used for scrolling y.
 * @function
 * @category components
 */
export function parallax() {
  $(window).on('mousemove', mouseParallax('.parallax'));
  $(window).on('scroll', () => {
    scrollParallax('--scroll-y', -0.4);
    scrollParallax('--scroll-y-slow', -0.2);
  });
}
