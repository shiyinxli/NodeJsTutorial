const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'big.txt');

const server = http.createServer((req, res) => {
  if (req.url === '/download') {
    // Set headers for file download
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="big.txt"',
    });

    // Create read stream
    const readStream = fs.createReadStream(FILE_PATH, { highWaterMark: 16 * 1024 });

    // Pipe stream to response
    readStream.pipe(res);

    readStream.on('error', (err) => {
      console.error('Read error:', err);
      res.statusCode = 500;
      res.end('Server error');
    });

    res.on('close', () => {
      console.log('Client disconnected, stream closed.');
      readStream.destroy();
    });
  } else {
    res.end('Go to /download to get the file');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
