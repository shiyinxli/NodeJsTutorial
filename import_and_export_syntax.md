### export syntax

**named exports**
```js
// Multiple named exports  
export function sayHello() {  
  console.log('Hello');  
}  
  
export function sayGoodbye() {  
  console.log('Goodbye');  
}  
  
// Alternative: export list at the end  
function add(a, b) {  
  return a + b;  
}  
  
function subtract(a, b) {  
  return a - b;  
}  
  
export { add, subtract };
```
**default export**
```js
// Only one default export per module  
export default function() {  
  console.log('I am the default export');  
}  
  
// Or with a named function/class/object  
function mainFunction() {  
  return 'Main functionality';  
}  
  
export default mainFunction;
```
**mixed exports**
```js
// Combining default and named exports  
export const VERSION = '1.0.0';  
  
function main() {  
  console.log('Main function');  
}  
  
export { main as default }; // Alternative way to set default
```
### import syntax
**importing named exports**
```js
// Import specific named exports  
import { sayHello, sayGoodbye } from './greetings.mjs';  
sayHello(); // Hello  
  
// Rename imports to avoid naming conflicts  
import { add as sum, subtract as minus } from './math.mjs';  
console.log(sum(5, 3)); // 8  
  
// Import all named exports as an object  
import * as math from './math.mjs';  
console.log(math.add(7, 4)); // 11
```
**importing default exports**
```js
// Import the default export  
import mainFunction from './main.mjs';  
mainFunction();  
  
// You can name the default import anything you want  
import anyNameYouWant from './main.mjs';  
anyNameYouWant();
```
**importing both default and named exports**
```js
// Import both default and named exports  
import main, { VERSION } from './main.mjs';  
console.log(VERSION); // 1.0.0  
main(); // Main function
```

next: [npm](npm.md)