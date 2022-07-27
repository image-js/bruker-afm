import { IOBuffer } from 'iobuffer';

import { readLine } from './utils/readLine';

/**
 *
 *
 * @export
 * @param {IOBuffer} buffer
 * @return {Array<object>}
 */
// Format Version >0x43XXXXX
// Voir les data offset, length et bytes/pixel dans les ciao
export function readHeader(buffer) {
  const header = { 'Image list': [] };
  const objectRegex = /\\\*(?<object>.*)/;
  const attributeRegex = /\\(?<attribute>[^:]*):(?<value>.*)/;
  let line = readLine(buffer);
  let object;
  while (line && line.charCodeAt(0) !== 0x1a) {
    // Header end is marked with a CTRL+Z character
    const objectExec = objectRegex.exec(line);
    if (objectExec) {
      object = {};
      if (objectExec[1].match('image list')) {
        header['Image list'].push(object);
      } else if (!objectExec[1].match('list end')) {
        header[objectExec[1]] = object;
      }
    } else {
      const attributesExec = attributeRegex.exec(line);
      if (attributesExec) {
        if (object === undefined) throw new Error('Bad header');
        let attr = attributesExec[2];
        if (!isNaN(attr) && !attributesExec[1].match('Version')) {
          object[attributesExec[1]] = Number(attr);
        } else {
          object[attributesExec[1]] = attr.trim();
        }
      } else {
        throw new Error('Bad header');
      }
    }
    line = readLine(buffer);
  }
  return header;
}
