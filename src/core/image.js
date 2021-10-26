/**
 * Creates a image with a src.
 *
 * @param {string} src - the src of the image
 * @return {HTMLImageElement} - the image
 */
export function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}
