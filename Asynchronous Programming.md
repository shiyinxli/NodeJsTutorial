previous: [[architecture diagram]]
### promises
```js
const fs = require('fs').promises;  
  
console.log('1. Reading file...');  
fs.readFile('myfile.txt', 'utf8')  
  .then(data => {  
    console.log('3. File content:', data);  
  })  
  .catch(err => console.error('Error:', err));  
  
console.log('2. This runs before file is read!');
```

### async/await
```js
async function readFiles() {  
  try {  
    console.log('1. Starting to read files...');  
    const data1 = await fs.readFile('file1.txt', 'utf8');  
    const data2 = await fs.readFile('file2.txt', 'utf8');  
    console.log('2. Files read successfully!');  
    return { data1, data2 };  
  } catch (error) {  
    console.error('Error reading files:', error);  
  }  
}
```

```js
// Use async/await for better readability  
async function getUserData(userId) {  
  try {  
    const user = await User.findById(userId);  
    const orders = await Order.find({ userId });  
    return { user, orders };  
  } catch (error) {     console.error('Failed to fetch user data:', error);  
    throw error; // Re-throw or handle appropriately  
  }  
}
```