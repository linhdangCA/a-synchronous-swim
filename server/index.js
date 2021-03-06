
const messageQueue = require('./js/messageQueue');

const keypressHandler = require('./js/keypressHandler');
// keypressHandler.initialize(message => console.log(`Message received: ${message}`));
keypressHandler.initialize(message => messageQueue.enqueue(message));
// console.log(messageQueue);

const httpHandler = require('./js/httpHandler');
// httpHandler.initialize(messages);
// console.log(messageQueue);

const http = require('http');
const server = http.createServer(httpHandler.router); // create a server / return an instance of http.Server

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
