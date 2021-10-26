/**
 * Draws the initial settings at the start
 * of the game.
 * @param {Object} game - the game object
 */
export function drawInitialSettings({context, canvas}) {
  context.globalAlpha = 1;
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws the color correction of the game at
 * the end.
 * @param {Object} game - the game object
 */
export function drawColorCorrect({context, canvas}) {
  context.fillStyle = '#381010';
  context.globalAlpha = 0.3;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
}
