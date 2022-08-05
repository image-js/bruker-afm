import * as imageJs from 'image-js';
import { IOBuffer } from 'iobuffer';
/**
 * Reads the data at a certain offset in the file.
 * It will process the data when I figure it out
 *
 * @export
 * @param {IOBuffer} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} bytesPerPixel
 * @return {Number[]}
 */

export function readPixels(buffer, offset, length, bytesPerPixel) {
  buffer.offset = offset;
  const iterations = (length / bytesPerPixel).toFixed(0);
  const pixels = [];
  let read;
  switch (bytesPerPixel) {
    case 1:
      read = () => buffer.readChar();
      break;
    case 2:
      read = () => buffer.readUint16();
      break;
    case 4:
      read = () => buffer.readUint32();
      break;
    default:
      throw new Error('Unsupported bytes per pixel resolution');
  }
  // Read buffer to fill pixels array
  for (let i = 0; i < iterations; i++) {
    pixels[i] = read();
  }
  return pixels;
}

/**
 * Converts raw height data to actual height values
 *
 * @export
 * @param {object} header
 * @param {object} image
 * @return {number}
 */
export function dataRescale(header, image) {
  const zScale = /[^[]*\[(?<softScale>[^\]]*)\] \((?<hardScale>[0-9.]*).*/;
  let hardScale = 1;
  let softScale = 1;

  // Scanner list contains soft scale so it needs to be defined
  if (header['Scanner list'] !== undefined) {
    if (image['Z scale'] !== undefined) {
      // Scale attributes also contain units so regex is needed
      const zScaleExec = zScale.exec(image['Z scale']);
      softScale = parseFloat(
        /[^0-9]*(?<scale>[0-9.]*).*/.exec(
          header['Scanner list'][zScaleExec.groups.softScale],
        )[1],
      );
      hardScale = parseFloat(zScaleExec.groups.hardScale);
    }
    // ActualData = hardValue * softScale, hardValue = raw value * hardScale
    image.data.map(
      (value) => {
        return value * hardScale * softScale;
      },
      { hardScale, softScale },
    );
  } else {
    throw new Error('Bad header, missing scale data');
  }
  return image;
}

/**
 * Get image from parsed file data
 *
 * @export
 * @param {object} data
 * @return {imageJs.Image}
 */
export function createImage(data) {
  const dataImage = data.images[1];
  const width = parseInt(dataImage['Samps/line'], 10);
  const height = parseInt(dataImage['Number of lines'], 10);
  const image = new imageJs.Image(width, height, dataImage.data, {
    bitDepth: 16,
    components: 1,
    alpha: 0,
  });
  return image;
}
