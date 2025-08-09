import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';

const src = path.join(process.cwd(), 'bigFile.txt');
const dest = path.join(process.cwd(), 'copy.txt');

// create a dummy big file
await fs.writeFile(src, 'Node.js '.repeat(1_000_000));

const readStream = createReadStream(src);
const writeStream = createWriteStream(dest);

readStream.pipe(writeStream).on('finish', () => {
  console.log('Big file copied with streams.');
});
