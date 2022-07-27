import { IOBuffer } from 'iobuffer';

import { readHeader } from './header';
import { readPixels } from './image';

/**
 * Reads a bukler afm image and returns an object
 *
 * @export
 * @param {IOBuffer} buffer
 * @return {object}
 */
export function readFile(buffer) {
  const object = {};
  object.header = readHeader(buffer);
  object.images = [];
  for (const image of object.header['Image list']) {
    object.images.push(
      readPixels(
        buffer,
        image['Data offset'],
        image['Data length'],
        image['Bytes/pixel'],
      ),
    );
  }
  return object;
}
