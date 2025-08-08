const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

let notes = [
  { id: 1, text: "Learn Node.js https module" },
  { id: 2, text: "Write secure servers" }
];


https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`Incoming request: ${req.method} ${pathname}`);

  // Serve homepage
  if (pathname === '/' && req.method === 'GET') {
    serveFile(res, 'index.html', 'text/html');

  // Serve about page
  } else if (pathname === '/about' && req.method === 'GET') {
    serveFile(res, 'about.html', 'text/html');

  // Serve static files from /public
  } else if (pathname.startsWith('/public/')) {
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.js': 'application/javascript',
      '.html': 'text/html'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    serveFile(res, filePath, contentType);

  // 404
  } // API: GET /api/notes
else if (pathname === '/api/notes' && req.method === 'GET') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(notes));

  // API: POST /api/notes
} else if (pathname === '/api/notes' && req.method === 'POST') {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const { text } = JSON.parse(body);
      if (!text) throw new Error('Missing text');
      const newNote = { id: Date.now(), text };
      notes.push(newNote);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newNote));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });

  // API: DELETE /api/notes/:id
} else if (pathname.startsWith('/api/notes/') && req.method === 'DELETE') {
  const id = parseInt(pathname.split('/')[3], 10);
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    const deleted = notes.splice(index, 1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(deleted[0]));
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
  }
}}).listen(4433, () => {
  console.log('HTTPS Server running at https://localhost:4433/');
});

// Helper to serve files
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}
