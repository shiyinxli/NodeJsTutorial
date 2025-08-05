|Code|Result|
|---|---|
|`JSON.stringify(obj)`|Converts object → JSON string|
|`JSON.parse(string)`|Converts JSON string → object|

# browser and server
### 🌐 What’s the **Browser**?

- Your browser (Chrome, Firefox) is the **client**.
- It runs the UI, renders HTML/CSS/JS.
- It **makes requests** to servers to get data or send data.
Example: You hit `fetch('http://localhost:3000/todos')` in browser JS — browser sends that request.

### 🖥️ What’s the **Server**?

- The server is the program listening on some port (your Node.js app).
- It **waits** for requests, processes them, and **sends back responses**.
- It’s like a waiter at a restaurant, taking orders (requests) and bringing food (responses).
### Why does the server want strings, not JS objects?

- **HTTP protocol is text-based.** Everything sent over the internet is basically a string of bytes.
- So when your browser sends data, it must be **serialized** (converted) into a string format that the server understands.
- **JSON** is the most common serialization format — easy to turn objects into strings (`JSON.stringify`) and back (`JSON.parse`).
