const fs = require('fs');

// Read stream (16 KB chunks)
const readStream = fs.createReadStream('big.txt', { highWaterMark: 16 * 1024 });

// Write stream (32 KB buffer)
const writeStream = fs.createWriteStream('copy_big.txt', { highWaterMark: 32 * 1024 });

// Pipe read -> write
readStream.pipe(writeStream);

// Optional: log events
readStream.on('data', chunk => {
  console.log('Read chunk of length:', chunk.length);
});

writeStream.on('drain', () => {
  console.log('Write stream drained, ready for more data');
});

writeStream.on('finish', () => {
  console.log('Finished writing file.');
});

writeStream.on('error', err => {
  console.error('Write error:', err);
});
