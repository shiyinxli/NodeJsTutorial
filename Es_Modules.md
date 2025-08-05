### commonJS Module
```js
// math.js (CommonJS)  
function add(a, b) {  
  return a + b;  
}  
  
function subtract(a, b) {  
  return a - b;  
}  
  
module.exports = {  
  add,  
  subtract  
};  
  
// app.js (CommonJS)  
const math = require('./math');  
console.log(math.add(5, 3)); // 8
```

### ES Module
```js
// math.mjs (ES Module)  
export function add(a, b) {  
  return a + b;  
}  
  
export function subtract(a, b) {  
  return a - b;  
}  
  
// app.mjs (ES Module)  
import { add, subtract } from './math.mjs';  
console.log(add(5, 3)); // 8
```

## enabling ES Modules
**using the .mjs File Extension**
The simplest way is to use the `.mjs` extension for your files.
Node.js will automatically treat these files as ES Modules.

next: [import and export syntax](import_and_export_syntax.md)
