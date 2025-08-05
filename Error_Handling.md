### modern Error Handling
using try... catch with Async/Await
```js
const fs = require('fs').promises;  
  
async function loadUserData(userId) {  
  try {  
    const data = await fs.readFile(`users/${userId}.json`, 'utf8');  
    const user = JSON.parse(data);  
  
    if (!user.email) {  
      throw new Error('Invalid user data: missing email');  
    }  
  
    return user;  
  } catch (error) {  
    // Handle different error types  
    if (error.code === 'ENOENT') {  
      throw new Error(`User ${userId} not found`);  
    } else if (error instanceof SyntaxError) {  
      throw new Error('Invalid user data format');  
    }  
    // Re-throw other errors  
    throw error;  
  } finally {  
    // Cleanup code that runs whether successful or not  
    console.log(`Finished processing user ${userId}`);  
  }  
}  
  
// Usage  
(async () => {  
  try {  
    const user = await loadUserData(123);  
    console.log('User loaded:', user);  
  } catch (error) {  
    console.error('Failed to load user:', error.message);  
    // Handle error (e.g., show to user, retry, etc.)  
  }  
})();
```

next: [Modules](modules.md)