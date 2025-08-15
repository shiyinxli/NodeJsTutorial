const fs = require('fs');
const { Transform } = require('stream');

// Transform stream: convert all text to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    // chunk is a Buffer, convert to string, uppercase, back to Buffer
    const upperChunk = chunk.toString().toUpperCase();
    callback(null, Buffer.from(upperChunk));
  }
});

// Read stream (16 KB chunks)
const readStream = fs.createReadStream('big.txt', { highWaterMark: 16 * 1024 });

// Write stream
const writeStream = fs.createWriteStream('upper_big.txt');

// Pipe: read -> transform -> write
readStream.pipe(upperCaseTransform).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('Finished writing uppercase file.');
});
