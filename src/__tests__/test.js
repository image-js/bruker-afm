import fs from 'fs';
import { join } from 'path';

import { IOBuffer } from 'iobuffer';

import { readFile } from '../reader';

const testFiles = './data';
describe('parse afm', () => {
  it('write to file', () => {
    const arrayBuffer = new IOBuffer(
      fs.readFileSync(join(__dirname, `${testFiles}/raw data.001`)),
    );
    const read = readFile(arrayBuffer);
    fs.writeFileSync(
      join(__dirname, `${testFiles}/out.json`),
      JSON.stringify(read),
      {
        encoding: 'utf8',
        flag: 'w',
      },
    );
  });
});
