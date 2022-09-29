import { IOBuffer } from 'iobuffer';
/**
 * Reads a line from buffer and advance pointer
 *
 * @param {IOBuffer} buffer
 * @return {string}
 */

export function readLine(buffer) {
  let output = '';
  let char = buffer.readChar();
  while (char !== '\n' && char) {
    if (char.charCodeAt(0) === 0x1a) {
      return char;
    }
    output += char;
    char = buffer.readChar();
  }
  return output;
}
