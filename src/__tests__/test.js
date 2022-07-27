import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { IOBuffer } from 'iobuffer';

import { readHeader } from '../header';

const testFiles = './data';
describe('parse afm', () => {
  it('should return 42', () => {
    const arrayBuffer = new IOBuffer(
      readFileSync(join(__dirname, `${testFiles}/raw data.001`)),
    );
    const header = readHeader(arrayBuffer);
    writeFileSync(
      join(__dirname, `${testFiles}/header.json`),
      JSON.stringify(header),
      {
        encoding: 'utf8',
        flag: 'w',
      },
    );
  });
});
