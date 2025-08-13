const EventEmitter = require('events');
const notifier = new EventEmitter();

// Regular listener
function saveMessage(msg) {
    console.log(`📦 Saving message: "${msg}"`);
}

// Add listeners
notifier.on('message', (msg) => {
    console.log(`💬 Message received: ${msg}`);
});
notifier.on('message', saveMessage);

// Once listener (only fires once)
notifier.once('welcome', (user) => {
    console.log(`👋 Welcome, ${user}! This message only appears once.`);
});

// Async event listener
notifier.on('login', (user) => {
    console.log(`🔑 ${user} just logged in.`);
    setTimeout(() => {
        notifier.emit('message', `Auto-reply to ${user}: Thanks for logging in!`);
    }, 1000);
});

// Emit some events
notifier.emit('welcome', 'Alice');
notifier.emit('welcome', 'Bob'); // Won’t trigger
notifier.emit('login', 'Alice');
notifier.emit('message', 'Hello, World!');

// Remove the saveMessage listener
notifier.removeListener('message', saveMessage);

// Trigger again (now saveMessage won’t be called)
setTimeout(() => {
    notifier.emit('message', 'This will NOT be saved to DB.');
}, 2000);
