previous: [javascript basics](javascript_basics.md)
```js
# Run a JavaScript file  
node app.js  
  
# Run with additional arguments  
node app.js arg1 arg2  
  
# Run in watch mode (restarts on file changes)  
node --watch app.js
```
### command line arguments
```js
// args.js  
console.log('All arguments:', process.argv);  
console.log('First argument:', process.argv[2]);  
console.log('Second argument:', process.argv[3]);  
  
// Example usage:  
// node args.js hello world  
// Output:  
// All arguments: ['/path/to/node', '/path/to/args.js', 'hello', 'world']  
// First argument: hello  
// Second argument: world
```
### common cli tools
```dash
# Common npm commands  
npm init # Initialize a new project  
npm install # Install dependencies  
npm update # Update packages  
npm audit # Check for vulnerabilities
```


next: [architecture diagram](architecture_diagram)