import { IOBuffer } from 'iobuffer';

import { readLine } from './utils/readLine';

/**
 *
 *
 * @export
 * @param {IOBuffer} buffer
 * @return {Array<object, Array<object>>}
 */
// Format Version >0x43XXXXX
// Voir les data offset, length et bytes/pixel dans les ciao
export function readHeader(buffer) {
  const header = {};
  const imageList = [];
  const objectRegex = /\\\*(?<object>.*)/;
  const attributeRegex = /\\[@2 :]*(?<attribute>[^:]*):(?<value>.*)/;
  let line = readLine(buffer);
  let object;
  // Header end is marked with a CTRL+Z character
  while (line && line.charCodeAt(0) !== 0x1a) {
    const objectExec = objectRegex.exec(line);
    // Check if it is the beginning of a new object
    if (objectExec) {
      object = {};
      // Image lists have the same name so they are added to a list to avoid conflicts
      if (objectExec[1].match('image list')) {
        imageList.push(object);
      } else if (!objectExec[1].match('list end')) {
        header[objectExec[1]] = object;
      }
    } // If not the beginning of a new object then add attributes to current object
    else {
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
  return [header, imageList];
}
