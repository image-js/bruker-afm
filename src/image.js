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
  // Read buffer to fill pixels array
  for (let i = 0; i < iterations; i++) {
    pixels[i] = buffer[func]();
  }
  return pixels;
}

/**
 * Converts raw height data to actual height values
 *
 * @export
 * @param {Array<number>} data
 * @param {object} header
 * @param {Array<object>} imageList
 * @return {number}
 */
export function dataHeight(data, header, imageList) {
  const zScale = /[^[]*\[(?<softScale>[^\]]*)\] \((?<hardScale>[0-9.]*).*/;
  let hardScale = 1;
  let softScale = 1;

  // Scanner list contains soft scale so it needs to be defined
  if (header['Scanner list'] !== undefined) {
    // Look for images with type Height
    for (const image of imageList) {
      if (
        image['Image Data'] !== undefined &&
        image['Image Data'].match('Height') &&
        image['Z scale'] !== undefined
      ) {
        // Scale attributes also contain units so regex is needed
        const zScaleExec = zScale.exec(image['Z scale']);
        softScale = parseFloat(
          /[^0-9]*(?<scale>[0-9.]).*/.exec(
            header['Scanner list'][zScaleExec.groups.softScale],
          )[1],
        );
        hardScale = parseFloat(zScaleExec.groups.hardScale);
      }
    }
  } else {
    throw new Error('Bad header, missing scale data');
  }
  // Height = hardValue * softScale, hardValue = raw value * hardScale
  data.map((value) => {
    return value * hardScale * softScale;
  });
  return data;
}
