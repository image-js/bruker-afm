import fs from 'fs';
import { join } from 'path';

import * as imageJs from 'image-js';
import { IOBuffer } from 'iobuffer';

import { readFile } from '../reader';
import { createImage } from '../image';

const testFiles = './data';
describe('parse afm', () => {
  it('write to file', () => {
    const arrayBuffer = new IOBuffer(
      fs.readFileSync(join(__dirname, `${testFiles}/raw data.001`)),
    );
    const read = readFile(arrayBuffer);
    const image = createImage(read);
    /* //uncomment to save files locally
    image.save('test.png');
    fs.writeFileSync(
      join(__dirname, `${testFiles}/out.json`),
      JSON.stringify(read),
      {
        encoding: 'utf8',
        flag: 'w',
      },
    );*/
  });
});
