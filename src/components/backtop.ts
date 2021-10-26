import $ from 'jquery';

/**
 * Creates a backtop component. The backtop creates a button
 * that brings the user back to the top of the page when
 * clicked.
 *
 * @return {JQuery<HTMLAnchorElement>} - returns a jquery element
 * of the backtop.
 */
export function createBacktop() {
  return $(`
<a href="javascript:void(0)" class="back-top">
  <svg
    width="16"
    height="16"
    focusable="false"
    class="back-top-icon"
    color="#609d4e"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
    ></path>
  </svg>
</a>
`);
}

/**
 * Creates a back-top component from a jQuery selector.
 *
 * @param {string} selector - jquery selector for the element
 * @param {{offset: number, scrollDuration: number}} options - the options are
 * optionals. Offset is the height at which it shows and the scroll duration
 * is the time the animation takes to go back to the top.
 */
export function backtop(selector, {offset = 300, scrollDuration = 700} = {}) {
  const $backtop = $(selector);
  let scrolling = false;

  if (!$backtop) {
    return;
  }

  $(window).on('scroll', () => {
    if (!scrolling) {
      scrolling = true;
      requestAnimationFrame(backtopLogic);
    }
  });

  $backtop.on('click', e => {
    e.preventDefault();
    scrollTo(0, scrollDuration);
  });

  /**
   * Adds or remove the main class to make the back-top visibility toggle.
   */
  function backtopLogic() {
    const windowTop = window.scrollY || document.documentElement.scrollTop;
    windowTop > offset
      ? $backtop.addClass('back-top--visible')
      : $backtop.removeClass('back-top--visible');
    scrolling = false;
  }
}

/**
 * Creates a smooth ease in out quad for javascript animations.
 *
 * @param {number} t - the progress of a animation
 * @param {number} b - the start of a animation
 * @param {number} c - the difference between the end and start of animation
 * @param {number} d - the animation duration
 * @return {number} - the smooth value of the animation
 */
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

/**
 * Scrolls to a specified y position in a certain
 * duration. Makes the scroll smooth.
 *
 * @param {number} final - the final y value
 * @param {number} duration - the duration in ms
 * @param {Function=} cb - a callback when it has scroll to the position
 */
function scrollTo(final, duration, cb = undefined) {
  const start = window.scrollY || document.documentElement.scrollTop;
  let currentTime = null;

  const animateScroll = function (timestamp) {
    if (!currentTime) currentTime = timestamp;
    let progress = timestamp - currentTime;
    if (progress > duration) progress = duration;
    const val = easeInOutQuad(progress, start, final - start, duration);
    window.scrollTo(0, val);
    if (progress < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  requestAnimationFrame(animateScroll);
}
