import { IOBuffer } from 'iobuffer';

import { readLine } from './utils/readLine';

/**
 *
 *
 * @export
 * @param {IOBuffer} buffer
 * @return {Array<object>}
 */
export function readHeader(buffer) {
  const header = [];
  const objectRegex = /\\\*(?<object>[.]*)/;
  const attributeRegex = /\\(?<attribute>[^:]*):(?<value>.*)/;
  let line = readLine(buffer);
  let object;
  while (line && line.charCodeAt(0) !== 0x1a) {
    // Header end is marked with a CTRL+Z character
    const objectExec = objectRegex.exec(line);
    if (objectExec) {
      if (object !== undefined) header.push(object);
      object = { name: objectExec[1] };
    } else {
      const attributesExec = attributeRegex.exec(line);
      if (attributesExec) {
        if (object === undefined) throw new Error('Bad header');
        object[attributesExec[0]] = attributesExec[1];
      }
    }
    line = readLine(buffer);
  }
  if (object !== undefined) header.push(object);
  return header;
}
