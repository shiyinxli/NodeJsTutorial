### core built-in Modules
| fs     | File system operations     |
| ------ | -------------------------- |
| http   | HTTP server and client     |
| path   | File path utilities        |
| os     | Operating system utilities |
| events | Event handling             |
| util   | Utility functions          |
| stream | Stream handling            |
| url    | URL parsing                |
To use any built-in module, use the `require()` function
`const http = require('http');`

## exporting modules
In Node.js, any file with a `.js` extension is a module. You can export functionality from a module in several ways.
### 1. Exporting multiple items
```js
// Exporting multiple functions  
const getCurrentDate = () => new Date().toISOString();  
  
const formatCurrency = (amount, currency = 'USD') => {  
  return new Intl.NumberFormat('en-US', {  
    style: 'currency',  
    currency: currency  
  }).format(amount);  
};  
  
// Method 1: Exporting multiple items  
exports.getCurrentDate = getCurrentDate;  
exports.formatCurrency = formatCurrency;  
  
// Method 2: Exporting an object with multiple properties  
// module.exports = { getCurrentDate, formatCurrency };
```
### 2. exporting a single item
```js
class Logger {  
  constructor(name) {  
    this.name = name;  
  }  
  
  log(message) {  
    console.log(`[${this.name}] ${message}`);  
  }  
  
  error(error) {  
    console.error(`[${this.name}] ERROR:`, error.message);  
  }  
}  
  
// Exporting a single class  
module.exports = Logger;
```
### 3. using your modules
import and use your custom modules using `require()` with a relative or absolute path
```js
const http = require('http');  
const path = require('path');  
  
// Importing custom modules  
const { getCurrentDate, formatCurrency } = require('./utils');  
const Logger = require('./logger');  
  
// Create a logger instance  
const logger = new Logger('App');  
  
// Create server  
const server = http.createServer((req, res) => {  
  try {  
    logger.log(`Request received for ${req.url}`);  
  
    res.writeHead(200, { 'Content-Type': 'text/html' });  
    res.write(`<h1>Welcome to our app!</h1>`);  
    res.write(`<p>Current date: ${getCurrentDate()}</p>`);  
    res.write(`<p>Formatted amount: ${formatCurrency(99.99)}</p>`);  
    res.end();  
  } catch (error) {  
    logger.error(error);  
    res.writeHead(500, { 'Content-Type': 'text/plain' });  
    res.end('Internal Server Error');  
  }  
});  
  
// Start server  
const PORT = process.env.PORT || 3000;  
server.listen(PORT, () => {  
  logger.log(`Server running at http://localhost:${PORT}`);  
});
```
### Module Resolution

When you require a module, Node.js looks for it in this order:

1. Core Node.js modules (like `fs`, `http`)
2. Node modules in `node_modules` folders
3. Local files (using `./` or `../` prefix)

next: [ES Modules](Es_Modules.md)
