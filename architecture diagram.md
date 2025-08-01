previous: [[command line usage]]

**1. Client Request Phase**

- Clients send requests to the Node.js server
- Each request is added to the **Event Queue**

**2. Event Loop Phase**

- The Event Loop continuously checks the **Event Queue**
- Picks up requests one by one in a loop

**3. Request Processing**

- Simple (non-blocking) tasks are handled immediately by the main thread
- Complex/blocking tasks are offloaded to the Thread Pool

**4. Response Phase**

- When blocking tasks complete, their callbacks are placed in the **Callback Queue**
- Event Loop processes callbacks and sends responses

next: [[Asynchronous Programming]]