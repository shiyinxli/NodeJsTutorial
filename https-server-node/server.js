const https = require('https');
const fs = require('fs');
const url = require('url');


const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

https.createServer(options, (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  console.log(`Incoming request: ${req.method} ${path}`);

  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the secure homepage!\n');

  } else if (path === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello there!\n');

  } else if (path === '/json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from JSON endpoint!' }));

  } else if(path === '/echo' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', ()=>{
        try {
            const parsed = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ you_sent: parsed }));
    }catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });}
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');}
  }).listen(4433, () => {
  console.log('HTTPS Server running at https://localhost:4433/');
});