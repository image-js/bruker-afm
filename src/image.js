import { IOBuffer } from 'iobuffer';

/**
 * Reads the data at a certain offset in the file.
 * It will process the data when I figure it out
 *
 * @param {IOBuffer} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} bytesPerPixel
 * @return {ArrayBuffer}
 */

export function readPixels(buffer, offset, length, bytesPerPixel) {
  buffer.offset = offset;
  const iterations = (length / bytesPerPixel).toFixed(0);
  const pixels = new ArrayBuffer(iterations);
  let func;
  switch (bytesPerPixel) {
    case 1:
      func = 'ReadChar';
      break;
    case 2:
      func = 'ReadUint16';
      break;
    case 4:
      func = 'ReadUint32';
      break;
    default:
      throw new Error('Unsupported bytes per pixel resolution');
  }
  for (let i = 0; i < iterations; i++) {
    pixels[i] = buffer[func]();
  }
  return pixels;
}

/**
 * Reads the image height as a two-dimensional array
 *
 * @param {IOBuffer} buffer
 * @return {*}
 */
function readHeight(buffer) {
  buffer.offset = 0x8192;
}

/**
 * Reads a series of force curves that correspond to the force volume image
 *
 * @param {IOBuffer} buffer
 * @return {*}
 */
function readForceVolume(buffer) {
  return 1;
}

export function readImage(buffer) {}
