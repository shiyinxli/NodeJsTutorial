const fs = require('fs');

// Step 1: Read file into a buffer
const buffer = fs.readFileSync('message.txt');

// Show the raw buffer (bytes in hex)
console.log('Raw Buffer:', buffer);

// Convert buffer back to string
console.log('As String:', buffer.toString('utf-8'));

// Encode to hex
const hex = buffer.toString('hex');
console.log('Hex:', hex);

// Encode to base64
const base64 = buffer.toString('base64');
console.log('Base64:', base64);

// Decode hex back to buffer
const fromHex = Buffer.from(hex, 'hex');
console.log('From Hex:', fromHex.toString());

// Decode base64 back to buffer
const fromBase64 = Buffer.from(base64, 'base64');
console.log('From Base64:', fromBase64.toString());

// Create a buffer manually
const custom = Buffer.alloc(5);   // 5 zeroed bytes
custom.write('Hi!');              // write string into buffer
console.log('Custom Buffer:', custom);
console.log('Custom as String:', custom.toString());
