const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (pathname === '/products') {
        res.end(JSON.stringify({
            message: 'Here are your products',
            category: query.category || 'all',
            price: query.price || 'any'
        }));
    } else if (pathname === '/about') {
        res.end(JSON.stringify({ message: 'This is the about page' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
