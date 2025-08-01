## myfirst.js
```js
let http = require('http');  
http.createServer(function (req, res) {  
  res.writeHead(200, {'Content-Type': 'text/html'});  
  res.end('Hello World!');  
}).listen(8080);
```

then open your browser:
```
http://localhost:8080
```

### variables and functions
```js
// Variables (let, const, var)  
let name = 'Node.js';  
const version = 20;  
  
// Function declaration  
function greet(user) {  
  return `Hello, ${user}!`; // Template literal (ES6)  
}  
  
// Arrow function (ES6+)  
const add = (a, b) => a + b;  
  
console.log(greet('Developer')); // Hello, Developer!  
console.log(add(5, 3)); // 8
```

### objects and arrays
```js
// Object  
const user = {  
  name: 'Alice',  
  age: 25,  
  greet() {  
    console.log(`Hi, I'm ${this.name}`);  
  }  
};  
  
// Array  
const colors = ['red', 'green', 'blue'];  
  
// Array methods (ES6+)  
colors.forEach(color => console.log(color));  
const lengths = colors.map(color => color.length);
```

### Asynchronous JavaScript
```js
// 1. Callbacks (traditional)  
function fetchData(callback) {  
  setTimeout(() => {  
    callback('Data received!');  
  }, 1000);  
}  
  
// 2. Promises (ES6+)  
const fetchDataPromise = () => {  
  return new Promise((resolve) => {  
    setTimeout(() => resolve('Promise resolved!'), 1000);  
  });  
};  
  
// 3. Async/Await (ES8+)  
async function getData() {  
  const result = await fetchDataPromise();  
  console.log(result);  
}  
  
getData(); // Call the async function
```