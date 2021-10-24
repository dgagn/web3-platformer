export function drawInitialSettings({context, canvas}) {
  context.globalAlpha = 1;
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}
