import $ from 'jquery';

export function createGame(selector) {
  const canvas = $(selector).get(0);
  const context = canvas.getContext('2d');

  return {
    canvas,
    context,
  };
}
