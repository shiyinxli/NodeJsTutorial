const http = require('http');
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'big.txt');

// Transform: uppercase text
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    callback(null, Buffer.from(upper));
  }
});

const server = http.createServer((req, res) => {
  if (req.url === '/download') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="upper_big.txt"',
    });

    // Read -> Transform -> Send to client
    const readStream = fs.createReadStream(FILE_PATH, { highWaterMark: 16 * 1024 });

    readStream
      .pipe(upperCaseTransform) // transform in real-time
      .pipe(res); // send to client

    readStream.on('error', err => {
      console.error('Read error:', err);
      res.statusCode = 500;
      res.end('Server error');
    });

    res.on('close', () => {
      console.log('Client disconnected.');
      readStream.destroy();
    });
  } else {
    res.end('Go to /download to get the transformed file');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
