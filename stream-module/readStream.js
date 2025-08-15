const fs = require('fs');

const readStream = fs.createReadStream('./big.txt', { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('--- NEW CHUNK ---');
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('Finished reading file.');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
