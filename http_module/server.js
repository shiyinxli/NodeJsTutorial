const http = require('http');
const { URL } = require('url');

let notes = [];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Basic CORS (for fetch calls)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // We'll add more routes soon...
  if (method === 'GET' && pathname === '/notes') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(notes));
}

else if (method === 'POST' && pathname === '/notes') {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const newNote = JSON.parse(body);
      newNote.id = Date.now(); // Unique ID
      notes.push(newNote);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newNote));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

else if (method === 'DELETE' && pathname.startsWith('/notes/')) {
  const id = parseInt(pathname.split('/')[2]);
  const index = notes.findIndex(note => note.id === id);

  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Note not found' }));
  } else {
    notes.splice(index, 1);
    res.writeHead(204);
    res.end();
  }
}
else {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}

});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
